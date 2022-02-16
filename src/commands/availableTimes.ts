import { parseDate } from 'chrono-node';

import TelegramBot, { Message } from 'node-telegram-bot-api';
import rp from 'request-promise';

import { Course, getCourseAvailability, login } from '../requests/golfBooking';
import { getLogin } from '../storage/logins';

export function availableTimesCommand(telegramBot: TelegramBot) {
  telegramBot.onText(
    /\/availabletimes (Manor|Castle) .*/i,
    async (msg: Message, match) => {
      const chatId = msg.chat.id;

      const request = rp.defaults({ jar: true, followAllRedirects: true });

      if (!msg.from) {
        return;
      }

      if (match?.length !== 2) {
        console.log(match?.length);
        await telegramBot.sendMessage(
          chatId,
          'Usage is /availableTimes (Manor/Castle) (date)'
        );
        return;
      }

      const courseString = match[1];
      const course = Course[courseString as keyof typeof Course];
      const dateString = match.splice(0, 2).join(' ');
      const date = parseDate(dateString);

      const credentials = await getLogin(msg.from.id);
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

      await telegramBot.sendMessage(chatId, message, { parse_mode: 'HTML' });
    }
  );
}
