import { promises, constants } from 'fs';
import { v4 as uuid } from 'uuid';

import { Course } from 'requests/golfBooking';

const fs = promises;
const fsConstants = constants;

export interface AutoBooking {
  id: string;
  course: Course;
  startDate: Date;
  endDate: Date;
}

export interface AutoBookings {
  [key: number]: AutoBooking[];
}

const dateTimeReviver = (key: string, value: string) => {
  if (['startDate', 'endDate'].includes(key)) {
    return new Date(value);
  }
  return value;
};

async function save(autoBookings: AutoBookings): Promise<boolean> {
  await fs.writeFile('autoBookings.json', JSON.stringify(autoBookings));
  console.log('Auto Bookings file has been saved.');
  return true;
}

let autoBookingsCache: AutoBookings | null = null;

async function load(): Promise<AutoBookings> {
  try {
    await fs.access('autoBookings.json', fsConstants.W_OK);
    const file = await fs.readFile('autoBookings.json');
    console.log('Auto Bookings file has been loaded.');
    return JSON.parse(file.toString(), dateTimeReviver);
  } catch (error) {
    console.error('Loading auto bookings file threw error', error);
    return {};
  }
}

export async function getAllAutoBookings(): Promise<AutoBookings> {
  if (!autoBookingsCache) {
    const autoBookings = await load();
    if (!autoBookingsCache) autoBookingsCache = autoBookings;
  }
  return autoBookingsCache;
}

export async function getUsersAutoBookings(
  userId: number
): Promise<AutoBooking[]> {
  const autoBookings = await getAllAutoBookings();
  return autoBookings[userId];
}

export async function addAutoBooking(
  userId: number,
  course: Course,
  startDate: Date,
  endDate: Date
): Promise<AutoBooking> {
  const id = uuid();
  const autoBookings: AutoBookings = await getAllAutoBookings();
  const userAutoBookings = autoBookings[userId] ?? [];
  userAutoBookings.push({ id, course, startDate, endDate });
  autoBookings[userId] = userAutoBookings;
  await save(autoBookings);
  return { id, course, startDate, endDate };
}

export async function deleteAutoBooking(
  id: string,
  userId: number
): Promise<boolean> {
  const autoBookings: AutoBookings = await getAllAutoBookings();
  const userAutoBookings = autoBookings[userId] ?? [];
  const newAutoBookings = userAutoBookings.filter((autoBooking) => {
    return autoBooking.id !== id;
  });
  if (userAutoBookings.length === newAutoBookings.length) return false;
  autoBookings[userId] = newAutoBookings;
  await save(autoBookings);
  return true;
}
