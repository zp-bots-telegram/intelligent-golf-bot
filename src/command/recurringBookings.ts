import { Bot } from 'grammy';
import { Course } from 'requests/golfBooking';
import {
  deleteRecurringBooking,
  getUsersRecurringBookings
} from 'storage/recurringBookings';

export function recurringBookingsCommand(bot: Bot): void {
  bot.on('callback_query', async (ctx, next) => {
    const query = ctx.callbackQuery;
    if (query.data && query.data.startsWith('recurringbooking')) {
      const id = query.data.split(':')[1];
      if (!(await deleteRecurringBooking(id, query.from.id))) {
        await ctx.answerCallbackQuery('Recurring Booking Delete Failed');
        return;
      }
      await ctx.deleteMessage();
      await ctx.answerCallbackQuery('Recurring Booking Deleted');
    }
    await next();
  });

  bot.on('message').command('recurringbookings', async (ctx) => {
    const userId = ctx.msg.from?.id;

    const recurringBookings = await getUsersRecurringBookings(userId);

    if (!recurringBookings || recurringBookings.length === 0) {
      await ctx.reply('No Active Recurring Bookings');
      return;
    }

    await ctx.reply('<b>Recurring Bookings</b>', { parse_mode: 'HTML' });

    await Promise.all(
      recurringBookings.map(async (recurringBooking) => {
        const { startDate, endDate, course } = recurringBooking;
        const dayName = startDate.toLocaleDateString('en-GB', {
          weekday: 'long'
        });
        let message = `<b>Course:</b> ${Course[course]}\n`;
        message += `<b>Day:</b> ${dayName}\n`;
        message += `<b>Start Time:</b> ${startDate.toLocaleTimeString()}\n`;
        message += `<b>End Time:</b> ${endDate.toLocaleTimeString()}\n`;
        await ctx.reply(message, {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  callback_data: `recurringbooking:${recurringBooking.id}`,
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
