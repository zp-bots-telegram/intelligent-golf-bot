import { AsyncTask, SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';

import rp from 'request-promise';

import { deleteMonitor, getAllMonitors } from 'storage/monitors';
import { getCourseAvailability, login } from 'requests/golfBooking';
import { getLogin } from 'storage/logins';
import { Bot } from 'grammy';

const cache: { [key: string]: string[] } = {};

export function scheduledAvailableTimesMonitor(bot: Bot): void {
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
        for (const monitor of userMonitors) {
          const { course, startDate, endDate } = monitor;
          const cacheKey = `${userId}${course}${startDate.toISOString()}${endDate.toISOString()}`;
          if (new Date() > endDate) {
            await deleteMonitor(monitor.id, userId);
            delete cache[cacheKey];
          }

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
            return el.time > startTime && el.time < endTime;
          });

          if (!cache[cacheKey]) {
            cache[cacheKey] = availability.map((timeSlot) => timeSlot.time);
            continue;
          }

          const cacheAvailability = cache[cacheKey];

          const newTimes: string[] = [];

          for (const timeSlot of availability) {
            if (cacheAvailability.includes(timeSlot.time)) continue;
            newTimes.push(timeSlot.time);
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

            await bot.api.sendMessage(userId, message, {
              parse_mode: 'HTML'
            });
          }

          // eslint-disable-next-line require-atomic-updates
          cache[cacheKey] = availability.map((timeSlot) => timeSlot.time);
        }
      }
    }
  });

  const job = new SimpleIntervalJob(
    { seconds: 10, runImmediately: true },
    task
  );
  scheduler.addSimpleIntervalJob(job);
}
