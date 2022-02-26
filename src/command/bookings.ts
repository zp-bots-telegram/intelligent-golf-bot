import rp from 'request-promise';

import { getBookings, login } from 'requests/golfBooking';
import { getLogin } from 'storage/logins';
import { Bot } from 'grammy';

export function bookingsCommand(bot: Bot): void {
  bot.on('message').command('bookings', async (ctx) => {
    const msg = ctx.msg;

    const request = rp.defaults({ jar: true, followAllRedirects: true });

    const credentials = await getLogin(msg.from.id);

    if (!credentials) {
      await ctx.reply('You are not authenticated');
      return;
    }

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

    await ctx.reply(message, { parse_mode: 'HTML' });
  });
}
