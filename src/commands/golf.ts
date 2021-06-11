import TelegramBot, { Message } from 'node-telegram-bot-api';

import rp from 'request-promise';
import { getBookings, init, login } from '../requests/golfBooking';

export function golfCommand(telegramBot: TelegramBot) {
  telegramBot.onText(
    /\/golf (.+)/,
    async (msg: Message, match: RegExpExecArray | null) => {
      const chatId = msg.chat.id;
      if (!match) return;
      const resp = match[1];

      const request = rp.defaults({ jar: true, followAllRedirects: true });

      await init(request);
      await login(request);
      const bookings = await getBookings(request);

      let message = '<b>Bookings</b>';

      bookings.forEach((booking) => {
        message += `\n\n<b>Date:</b> ${booking.date}\n<b>Course:</b> ${
          booking.course
        }\n<b>Participants:</b> ${booking.participants.join(', ')}`;
      });

      await telegramBot.sendMessage(chatId, message, { parse_mode: 'HTML' });
    }
  );
}
