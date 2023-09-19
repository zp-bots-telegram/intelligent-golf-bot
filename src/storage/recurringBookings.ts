import { promises, constants } from 'fs';
import { v4 as uuid } from 'uuid';

import { Course } from 'requests/golfBooking';

const fs = promises;
const fsConstants = constants;

export interface RecurringBooking {
  id: string;
  course: Course;
  startDate: Date;
  endDate: Date;
}

export interface RecurringBookings {
  [key: number]: RecurringBooking[];
}

const dateTimeReviver = (key: string, value: string) => {
  if (['startDate', 'endDate'].includes(key)) {
    return new Date(value);
  }
  return value;
};

async function save(recurringBookings: RecurringBookings): Promise<boolean> {
  await fs.writeFile(
    'recurringBookings.json',
    JSON.stringify(recurringBookings)
  );
  console.log('Recurring Bookings file has been saved.');
  return true;
}

let recurringBookingsCache: RecurringBookings | null = null;

async function load(): Promise<RecurringBookings> {
  try {
    await fs.access('recurringBookings.json', fsConstants.W_OK);
    const file = await fs.readFile('recurringBookings.json');
    console.log('Recurring Bookings file has been loaded.');
    return JSON.parse(file.toString(), dateTimeReviver);
  } catch (error) {
    console.error('Loading recurring bookings file threw error', error);
    return {};
  }
}

export async function getAllRecurringBookings(): Promise<RecurringBookings> {
  if (!recurringBookingsCache) {
    const recurringBookings = await load();
    if (!recurringBookingsCache) recurringBookingsCache = recurringBookings;
  }
  return recurringBookingsCache;
}

export async function getUsersRecurringBookings(
  userId: number
): Promise<RecurringBooking[]> {
  const recurringBookings = await getAllRecurringBookings();
  return recurringBookings[userId];
}

export async function addRecurringBooking(
  userId: number,
  course: Course,
  startDate: Date,
  endDate: Date
): Promise<RecurringBooking> {
  const id = uuid();
  const recurringBookings: RecurringBookings = await getAllRecurringBookings();
  const userRecurringBookings = recurringBookings[userId] ?? [];
  userRecurringBookings.push({ id, course, startDate, endDate });
  recurringBookings[userId] = userRecurringBookings;
  await save(recurringBookings);
  return { id, course, startDate, endDate };
}

export async function deleteRecurringBooking(
  id: string,
  userId: number
): Promise<boolean> {
  const recurringBookings: RecurringBookings = await getAllRecurringBookings();
  const userRecurringBookings = recurringBookings[userId] ?? [];
  const newRecurringBookings = userRecurringBookings.filter(
    (recurringBooking) => {
      return recurringBooking.id !== id;
    }
  );
  if (userRecurringBookings.length === newRecurringBookings.length)
    return false;
  recurringBookings[userId] = newRecurringBookings;
  await save(recurringBookings);
  return true;
}
