import { deleteAutoBooking, getUsersAutoBookings } from 'storage/autoBookings';
import { Bot } from 'grammy';
import { Course } from 'requests/golfBooking';

export function autoBookingsCommand(bot: Bot): void {
  bot.on('callback_query', async (ctx, next) => {
    const query = ctx.callbackQuery;
    if (query.data && query.data.startsWith('autobooking')) {
      const id = query.data.split(':')[1];
      if (!(await deleteAutoBooking(id, query.from.id))) {
        await ctx.answerCallbackQuery('Auto Booking Delete Failed');
        return;
      }
      await ctx.deleteMessage();
      await ctx.answerCallbackQuery('Auto Booking Deleted');
    }
    await next();
  });

  bot.on('message').command('autobookings', async (ctx) => {
    const userId = ctx.msg.from?.id;

    const autoBookings = await getUsersAutoBookings(userId);

    if (!autoBookings || autoBookings.length === 0) {
      await ctx.reply('No Active Auto Bookings');
      return;
    }

    await ctx.reply('<b>Auto Bookings</b>', { parse_mode: 'HTML' });

    await Promise.all(
      autoBookings.map(async (autoBooking) => {
        const { startDate, endDate, course } = autoBooking;
        let message = `<b>Course:</b> ${Course[course]}\n`;
        message += `<b>Start Date:</b> ${startDate.toISOString()}\n`;
        message += `<b>End Date:</b> ${endDate.toISOString()}`;
        await ctx.reply(message, {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  callback_data: `autobooking:${autoBooking.id}`,
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
