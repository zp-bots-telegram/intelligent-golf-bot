import { promises, constants } from 'fs';

import { Course } from '../requests/golfBooking';

const fs = promises;
const fsConstants = constants;

export interface Monitor {
  course: Course;
  startDate: Date;
  endDate: Date;
}

export interface Monitors {
  [key: number]: Monitor;
}

const dateTimeReviver = (key: string, value: string) => {
  if (['startDate', 'endDate'].includes(key)) {
    return new Date(value);
  }
  return value;
};

async function save(monitors: Monitors): Promise<Boolean> {
  await fs.writeFile('monitors.json', JSON.stringify(monitors));
  console.log('Monitors file has been saved.');
  return true;
}

let monitorCache: Monitors | null = null;

async function load(): Promise<Monitors> {
  try {
    await fs.access('monitors.json', fsConstants.W_OK);
    const file = await fs.readFile('monitors.json');
    console.log('JSON file has been loaded.');
    return JSON.parse(file.toString(), dateTimeReviver);
  } catch (error) {
    console.error('Loading monitors file threw error', error);
    return {};
  }
}

export async function getMonitors(): Promise<Monitors> {
  if (!monitorCache) {
    const monitors = await load();
    if (!monitorCache) monitorCache = monitors;
  }
  return monitorCache;
}

export async function getMonitor(userId: number): Promise<Monitor> {
  const monitors = await getMonitors();
  return monitors[userId];
}

export async function addMonitor(
  userId: number,
  course: Course,
  startDate: Date,
  endDate: Date
): Promise<Monitor> {
  const monitors: Monitors = await getMonitors();
  monitors[userId] = { course, startDate, endDate };
  await save(monitors);
  return { course, startDate, endDate };
}
