import { parseDate } from 'chrono-node';

import rp from 'request-promise';

import { Course, getCourseAvailability, login } from 'requests/golfBooking';
import { getLogin } from 'storage/logins';
import { Telegraf } from 'telegraf';

export function availableTimesCommand(bot: Telegraf): void {
  bot.command('availabletimes', async (ctx) => {
    const msg = ctx.message;
    const command = ctx.message.text;
    const match = /\/availabletimes (manor|castle) (.*)/i.exec(command);

    const request = rp.defaults({ jar: true, followAllRedirects: true });

    if (!msg.from) {
      return;
    }
    console.log(JSON.stringify(match));

    if (match?.length !== 3) {
      console.log(match?.length);
      await ctx.reply('Usage is /availableTimes (Manor/Castle) (date)');
      return;
    }

    let courseString = match[1];
    courseString = courseString[0].toUpperCase() + courseString.substring(1);
    const course = Course[courseString as keyof typeof Course];
    const dateString = match[2];
    const date = parseDate(dateString);

    const credentials = await getLogin(msg.from.id);

    if (!credentials) {
      await ctx.reply('You are not authenticated');
      return;
    }

    await login(request, {
      username: credentials.username,
      password: credentials.password
    });
    const availableTimes = await getCourseAvailability(request, {
      course,
      date
    });

    let message = '<b>Available Times</b>\n';
    message += `<b>Course:</b> ${courseString}\n`;
    message += `<b>Date:</b> ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    availableTimes.forEach((time) => {
      message += `\n<b>Time:</b> ${time}`;
    });

    await ctx.replyWithHTML(message);
  });
}
