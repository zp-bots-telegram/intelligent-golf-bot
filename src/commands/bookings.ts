import TelegramBot, { Message } from 'node-telegram-bot-api';
import rp from 'request-promise';

import { getBookings, login } from '../requests/golfBooking';
import { getLogin } from '../storage/logins';

export function bookingsCommand(telegramBot: TelegramBot) {
  telegramBot.onText(/\/bookings/i, async (msg: Message) => {
    const chatId = msg.chat.id;

    const request = rp.defaults({ jar: true, followAllRedirects: true });

    if (!msg.from) {
      return;
    }

    const credentials = await getLogin(msg.from.id);
    await login(request, {
      username: credentials.username,
      password: credentials.password
    });
    const bookingsResponse = await getBookings(request);

    let message = '<b>Bookings</b>';

    bookingsResponse.forEach((booking) => {
      const details = booking.moreDetails;

      message += `\n\n<b>Date:</b> ${booking.date}\n<b>Time: </b> ${
        booking.time
      }\n<b>Course:</b> ${
        details.startingTee.split(' ')[0]
      }\n<b>Participants:</b> ${details.participants.join(', ')}`;
    });

    await telegramBot.sendMessage(chatId, message, { parse_mode: 'HTML' });
  });
}
