import { AsyncTask, CronJob, ToadScheduler } from 'toad-scheduler';

import { getAllRecurringBookings } from 'storage/recurringBookings';
import { Course } from 'requests/golfBooking';
import { Bot } from 'grammy';
import { addAutoBooking } from 'storage/autoBookings';

export function scheduledRecurringBookingsMonitor(bot: Bot): void {
  const scheduler = new ToadScheduler();
  const recurringBookingJob = new AsyncTask('recurringBookings', async () => {
    const recurringBookings = await getAllRecurringBookings();
    for (const userKey in recurringBookings) {
      if (Object.hasOwnProperty.call(recurringBookings, userKey)) {
        const userId = Number.parseInt(userKey, 10);
        const userRecurringBookings = recurringBookings[userKey];

        for (const recurringBooking of userRecurringBookings) {
          const { course, startDate, endDate } = recurringBooking;
          const today = new Date();
          if (recurringBooking.startDate.getDay() !== today.getDay()) {
            continue;
          }

          const startDateInThreeWeeks = new Date();
          startDateInThreeWeeks.setDate(today.getDate() + 3 * 7);
          startDateInThreeWeeks.setHours(
            startDate.getHours(),
            startDate.getMinutes()
          );

          const endDateInThreeWeeks = new Date();
          endDateInThreeWeeks.setDate(today.getDate() + 3 * 7);
          endDateInThreeWeeks.setHours(
            endDate.getHours(),
            endDate.getMinutes()
          );

          const autoBooking = await addAutoBooking(
            userId,
            course,
            startDateInThreeWeeks,
            endDateInThreeWeeks
          );

          const dayName = autoBooking.startDate.toLocaleDateString('en-GB', {
            weekday: 'long'
          });

          let message = '<b>Recurring Booking Activated!</b>\n';
          message += `<b>Course:</b> ${Course[autoBooking.course]}\n`;
          message += `<b>Day:</b> ${dayName}\n`;
          message += `<b>Start Time:</b> ${autoBooking.startDate.toLocaleTimeString()}\n`;
          message += `<b>End Time:</b> ${autoBooking.endDate.toLocaleTimeString()}\n`;
          await bot.api.sendMessage(userId, message, {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    callback_data: `autobooking:${autoBooking.id}`,
                    text: 'Remove'
                  }
                ]
              ]
            }
          });
        }
      }
    }
  });

  const recurringBookingNightly = new CronJob(
    {
      cronExpression: '0 10 * * *'
      // cronExpression: '10,20,30,40,50,0 * * * * *'
    },
    recurringBookingJob,
    {
      id: 'recurringBookingNightly',
      preventOverrun: true
    }
  );

  scheduler.addCronJob(recurringBookingNightly);
}
