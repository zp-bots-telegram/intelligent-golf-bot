import rp from 'request-promise';

import { cancelBooking, getBookings, login } from 'requests/golfBooking';
import { getLogin } from 'storage/logins';
import { Bot } from 'grammy';

export function bookingsCommand(bot: Bot): void {
  bot.on('callback_query', async (ctx, next) => {
    const query = ctx.callbackQuery;
    if (query.data && query.data.startsWith('bookings')) {
      const bookingId = query.data.split(':')[1];

      const request = rp.defaults({ jar: rp.jar(), followAllRedirects: true });

      const credentials = await getLogin(query.from.id);

      if (!credentials) {
        await ctx.answerCallbackQuery('You are not authenticated');
        return;
      }

      if (!(await cancelBooking(request, { bookingId: bookingId }))) {
        await ctx.answerCallbackQuery('Auto Booking Delete Failed');
        return;
      }
      await ctx.deleteMessage();
      await ctx.answerCallbackQuery('Booking Deleted');
    }
    await next();
  });

  bot.on('message').command('bookings', async (ctx) => {
    const msg = ctx.msg;

    const request = rp.defaults({ jar: rp.jar(), followAllRedirects: true });

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

    await ctx.reply('<b>Auto Bookings</b>', { parse_mode: 'HTML' });

    await Promise.all(
      bookingsResponse.map(async (booking) => {
        const details = booking.moreDetails;

        const message = `\n\n<b>Date:</b> ${booking.date}\n<b>Time: </b> ${
          booking.time
        }\n<b>Course:</b> ${
          details.startingTee.split(' ')[0]
        }\n<b>Participants:</b> ${details.participants.join(', ')}`;

        await ctx.reply(message, {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  callback_data: `bookings:${booking.id}`,
                  text: 'Delete'
                }
              ]
            ]
          }
        });
      })
    );
  });
}
