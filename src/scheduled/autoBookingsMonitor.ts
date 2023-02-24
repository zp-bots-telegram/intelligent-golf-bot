import { AsyncTask, CronJob, ToadScheduler } from 'toad-scheduler';

import rp from 'request-promise';

import { deleteAutoBooking, getAllAutoBookings } from 'storage/autoBookings';
import {
  bookTimeSlot,
  getCourseAvailability,
  login
} from 'requests/golfBooking';
import { getLogin } from 'storage/logins';
import { Bot } from 'grammy';
import { RequestAPI, RequiredUriUrl } from 'request';

const loginCache: {
  [key: string]: RequestAPI<
    rp.RequestPromise<unknown>,
    rp.RequestPromiseOptions,
    RequiredUriUrl
  >;
} = {};

export function scheduledAutoBookingsMonitor(bot: Bot): void {
  const scheduler = new ToadScheduler();
  const task = new AsyncTask('autoBookings', async () => {
    console.log('Running auto booking: ', new Date().toTimeString());
    const autoBookings = await getAllAutoBookings();
    for (const userKey in autoBookings) {
      if (Object.hasOwnProperty.call(autoBookings, userKey)) {
        const userId = Number.parseInt(userKey, 10);
        const userAutoBookings = autoBookings[userKey];
        let request = loginCache[userId];
        if (!request) {
          request = rp.defaults({
            jar: true,
            followAllRedirects: true
          });
          const credentials = await getLogin(userId);
          await login(request, {
            username: credentials.username,
            password: credentials.password
          });
        }
        for (const autoBooking of userAutoBookings) {
          const { course, startDate, endDate } = autoBooking;
          if (new Date() > endDate) {
            await deleteAutoBooking(autoBooking.id, userId);
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
            return el.canBook && el.time > startTime && el.time < endTime;
          });

          if (availability.length === 0) {
            continue;
          }

          availability = availability.reverse();

          console.log('job running');

          let bookedSlot;
          let timeSlot;
          do {
            timeSlot = availability.pop();
            console.log('trying to book', timeSlot?.time);
            if (!timeSlot) break;
            bookedSlot = await bookTimeSlot(request, {
              timeSlot
            });
          } while (!bookedSlot);

          if (bookedSlot) {
            let message = '<b>Time Auto Booked!</b>\n';
            message += `<b>Date:</b> ${startDate.getDate()}/${
              startDate.getMonth() + 1
            }/${startDate.getFullYear()}`;
            message += `\n<b>Time: </b> ${timeSlot?.time}\n<b>Course:</b> ${
              bookedSlot.startingTee.split(' ')[0]
            }\n<b>Participants:</b> ${bookedSlot.participants.join(', ')}`;
            await bot.api.sendMessage(userId, message, {
              parse_mode: 'HTML'
            });
            await deleteAutoBooking(autoBooking.id, userId);
          }
        }
      }
    }
  });

  const job1 = new CronJob({ cronExpression: '* 0,1,2,3,4,5 0 * * *' }, task, {
    id: 'autoBooking',
    preventOverrun: true
  });
  scheduler.addCronJob(job1);
}
