import { parse as parseDate } from 'chrono-node';

import { Course } from 'requests/golfBooking';
import { getLogin } from 'storage/logins';
import { Bot } from 'grammy';
import { addRecurringBooking } from 'storage/recurringBookings';

export function addRecurringBookingCommand(bot: Bot): void {
  bot.on('message').command('addrecurringbooking', async (ctx) => {
    const msg = ctx.msg;
    const command = msg.text;
    const match = /\/addrecurringbooking (manor|castle) (.*)/i.exec(command);

    if (match?.length !== 3) {
      await ctx.reply(
        'Usage is /addrecurringbooking (Manor/Castle) (date) from (startTime) to (endTime)'
      );
      return;
    }

    let courseString = match[1];
    courseString = courseString[0].toUpperCase() + courseString.substring(1);
    const course = Course[courseString as keyof typeof Course];
    const dateString = match[2];
    const date = parseDate(dateString);

    const start = date[0].start.date();
    const end =
      date[0].end?.date() ??
      date[1]?.start.date() ??
      new Date(new Date(start).setUTCHours(23, 59, 59));

    if (!date[0].end?.date() && !date[1]?.start.date()) {
      start.setUTCHours(0, 0, 0);
    }

    if (
      start.getUTCDate() !== end.getUTCDate() ||
      start.getUTCMonth() !== end.getUTCMonth()
    ) {
      await ctx.reply('You must specify a start and end date on the same day');
    }

    const credentials = await getLogin(msg.from.id);

    if (!credentials) {
      await ctx.reply('You are not authenticated');
      return;
    }

    await addRecurringBooking(msg.from.id, course, start, end);

    const dayName = start.toLocaleDateString('en-GB', {
      weekday: 'long'
    });

    let message = '<b>Recurring Booking Added</b>\n';
    message += `<b>Course:</b> ${courseString}\n`;
    message += `<b>Day:</b> ${dayName}\n`;
    message += `<b>Start Time:</b> ${start.toLocaleTimeString()}\n`;
    message += `<b>End Time:</b> ${end.toLocaleTimeString()}\n`;
    message += `<b>Note:</b> The first auto booking will be in three weeks time`;

    await ctx.reply(message, { parse_mode: 'HTML' });
  });
}
