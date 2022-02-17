import { AsyncTask, SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';

import TelegramBot from 'node-telegram-bot-api';
import rp from 'request-promise';

import { getMonitors } from '../storage/monitors';
import { getCourseAvailability, login } from '../requests/golfBooking';
import { getLogin } from '../storage/logins';

const cache: { [key: number]: string[] } = {};

export function scheduledAvailableTimesMonitor(bot: TelegramBot) {
  const scheduler = new ToadScheduler();
  const task = new AsyncTask('availableTimesMonitor', async () => {
    const monitors = await getMonitors();
    for (const key in monitors) {
      if (Object.hasOwnProperty.call(monitors, key)) {
        const userId = Number.parseInt(key, 10);
        const monitor = monitors[key];
        const { course, startDate, endDate } = monitor;
        const request = rp.defaults({ jar: true, followAllRedirects: true });
        const credentials = await getLogin(userId);
        await login(request, {
          username: credentials.username,
          password: credentials.password
        });
        let availability = await getCourseAvailability(request, {
          course,
          date: startDate
        });
        const startTime = `${startDate
          .getUTCHours()
          .toString()
          .padStart(2, '0')}:${startDate
          .getUTCMinutes()
          .toString()
          .padStart(2, '0')}`;
        const endTime = `${endDate
          .getUTCHours()
          .toString()
          .padStart(2, '0')}:${endDate
          .getUTCMinutes()
          .toString()
          .padStart(2, '0')}`;
        availability = availability.filter((el) => {
          return el > startTime && el < endTime;
        });

        if (!cache[userId]) {
          cache[userId] = availability;
          return;
        }

        const cacheAvailability = cache[userId];

        for (const timeKey in availability) {
          if (Object.hasOwnProperty.call(availability, timeKey)) {
            const time = availability[timeKey];
            if (cacheAvailability.includes(time)) continue;
            let message = '<b>New Available Times</b>\n';
            message += `<b>Course:</b> ${course}\n`;
            message += `<b>Search Date:</b> ${startDate.getDate()}/${
              startDate.getMonth() + 1
            }/${startDate.getFullYear()}\n`;
            message += `<b>Search Start Time</b> ${startTime}\n`;
            message += `<b>Search End Time</b> ${endTime}\n`;

            availability.forEach((availabilityTime) => {
              message += `\n<b>Time:</b> ${availabilityTime}`;
            });

            await bot.sendMessage(userId, message, { parse_mode: 'HTML' });
            break;
          }
        }

        cache[userId] = availability;
      }
    }
  });

  const job = new SimpleIntervalJob(
    { seconds: 15, runImmediately: true },
    task
  );
  scheduler.addSimpleIntervalJob(job);
}
