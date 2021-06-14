/* eslint-disable babel/camelcase */
import TelegramBot, { Message } from 'node-telegram-bot-api';
import rp from 'request-promise';

import { getBookings, init, login } from '../requests/golfBooking';

export function bookings(telegramBot: TelegramBot) {
  telegramBot.onText(/\/bookings/, async (msg: Message) => {
    const chatId = msg.chat.id;

    const request = rp.defaults({ jar: true, followAllRedirects: true });

    if (!msg.from) {
      return;
    }

    await init(request);
    await login(request, { userId: msg.from.id });
    const bookingsResponse = await getBookings(request);

    let message = '<b>Bookings</b>';

    bookingsResponse.forEach((booking) =>
      message += `\n\n<b>Date:</b> ${booking.date}\n<b>Course:</b> ${
        booking.course
      }\n<b>Participants:</b> ${booking.participants.join(', ')}`;
    });

    await telegramBot.sendMessage(chatId, message, { parse_mode: 'HTML' });
  });
}
