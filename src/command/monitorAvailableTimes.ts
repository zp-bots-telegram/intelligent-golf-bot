import { parse as parseDate } from 'chrono-node';

import { Course } from 'requests/golfBooking';
import { getLogin } from 'storage/logins';
import { addMonitor } from 'storage/monitors';
import { Telegraf } from 'telegraf';

export function monitorAvailableTimesCommand(bot: Telegraf): void {
  bot.command('monitor', async (ctx) => {
    const msg = ctx.message;
    const command = ctx.message.text;
    const match = /\/monitor (manor|castle) .*/i.exec(command);

    if (!msg.from) {
      return;
    }

    if (match?.length !== 2) {
      console.log(match?.length);
      await ctx.reply(
        'Usage is /monitorravailabletimes (Manor/Castle) (date) from (startTime) - (endTime)'
      );
      return;
    }

    let courseString = match[1];
    courseString = courseString[0].toUpperCase() + courseString.substring(1);
    const course = Course[courseString as keyof typeof Course];
    const dateString = match.splice(0, 2).join(' ');
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

    await addMonitor(msg.from.id, course, start, end);

    let message = '<b>Monitor Added</b>\n';
    message += `<b>Course:</b> ${courseString}\n`;
    message += `<b>Start Date:</b> ${start.toISOString()}`;
    message += `<b>End Date:</b> ${end.toISOString()}`;

    await ctx.replyWithHTML(message);
  });
}
