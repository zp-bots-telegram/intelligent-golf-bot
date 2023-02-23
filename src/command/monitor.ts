import { parse as parseDate } from 'chrono-node';

import { Course } from 'requests/golfBooking';
import { getLogin } from 'storage/logins';
import { addMonitor } from 'storage/monitors';
import { Bot } from 'grammy';

export function monitorCommand(bot: Bot): void {
  bot.on('message').command('monitor', async (ctx) => {
    const msg = ctx.msg;
    const command = msg.text;
    const match = /\/monitor (manor|castle) (.*)/i.exec(command);

    if (match?.length !== 3) {
      await ctx.reply(
        'Usage is /monitor (Manor/Castle) (date) from (startTime) - (endTime)'
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

    await addMonitor(msg.from.id, course, start, end);

    let message = '<b>Monitor Added</b>\n';
    message += `<b>Course:</b> ${courseString}\n`;
    message += `<b>Start Date:</b> ${start.toISOString()}\n`;
    message += `<b>End Date:</b> ${end.toISOString()}`;

    await ctx.reply(message, { parse_mode: 'HTML' });
  });
}
