import { AsyncTask, SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';

import TelegramBot from 'node-telegram-bot-api';
import rp from 'request-promise';

import { getAllMonitors } from '../storage/monitors';
import { getCourseAvailability, login } from '../requests/golfBooking';
import { getLogin } from '../storage/logins';

const cache: { [key: string]: string[] } = {};

export function scheduledAvailableTimesMonitor(bot: TelegramBot) {
  const scheduler = new ToadScheduler();
  const task = new AsyncTask('availableTimesMonitor', async () => {
    const monitors = await getAllMonitors();
    for (const userKey in monitors) {
      if (Object.hasOwnProperty.call(monitors, userKey)) {
        const userId = Number.parseInt(userKey, 10);
        const userMonitors = monitors[userKey];
        const request = rp.defaults({
          jar: true,
          followAllRedirects: true
        });
        const credentials = await getLogin(userId);
        await login(request, {
          username: credentials.username,
          password: credentials.password
        });
        for (const monitorKey in userMonitors) {
          if (Object.hasOwnProperty.call(monitors, userKey)) {
            const { course, startDate, endDate } = userMonitors[monitorKey];
            const cacheKey = `${course}${startDate.toISOString()}${endDate.toISOString()}`;

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

            if (!cache[cacheKey]) {
              cache[cacheKey] = availability;
              continue;
            }

            const cacheAvailability = cache[cacheKey];

            const newTimes: string[] = [];

            for (const timeKey in availability) {
              if (Object.hasOwnProperty.call(availability, timeKey)) {
                const time = availability[timeKey];
                if (cacheAvailability.includes(time)) continue;
                newTimes.push(time);
              }
            }

            if (newTimes.length > 0) {
              let message = '<b>New Available Times</b>\n';
              message += `<b>Course:</b> ${course}\n`;
              message += `<b>Search Date:</b> ${startDate.getDate()}/${
                startDate.getMonth() + 1
              }/${startDate.getFullYear()}\n`;
              message += `<b>Search Start Time</b> ${startTime}\n`;
              message += `<b>Search End Time</b> ${endTime}\n`;

              newTimes.forEach((availabilityTime) => {
                message += `\n<b>New Available Time:</b> ${availabilityTime}`;
              });

              await bot.sendMessage(userId, message, { parse_mode: 'HTML' });
            }

            // eslint-disable-next-line require-atomic-updates
            cache[cacheKey] = availability;
          }
        }
      }
    }
  });

  const job = new SimpleIntervalJob({ minutes: 1, runImmediately: true }, task);
  scheduler.addSimpleIntervalJob(job);
}
