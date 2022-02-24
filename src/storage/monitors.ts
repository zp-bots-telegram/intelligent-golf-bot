import { promises, constants } from 'fs';
import { v4 as uuidv4 } from 'uuid';

import { Course } from 'requests/golfBooking';

const fs = promises;
const fsConstants = constants;

export interface Monitor {
  id: string;
  course: Course;
  startDate: Date;
  endDate: Date;
}

export interface Monitors {
  [key: number]: Monitor[];
}

const dateTimeReviver = (key: string, value: string) => {
  if (['startDate', 'endDate'].includes(key)) {
    return new Date(value);
  }
  return value;
};

async function save(monitors: Monitors): Promise<boolean> {
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

export async function getAllMonitors(): Promise<Monitors> {
  if (!monitorCache) {
    const monitors = await load();
    if (!monitorCache) monitorCache = monitors;
  }
  return monitorCache;
}

export async function getUsersMonitors(userId: number): Promise<Monitor[]> {
  const monitors = await getAllMonitors();
  return monitors[userId];
}

export async function addMonitor(
  userId: number,
  course: Course,
  startDate: Date,
  endDate: Date
): Promise<Monitor> {
  const id = uuidv4();
  const monitors: Monitors = await getAllMonitors();
  const userMonitors = monitors[userId] ?? [];
  userMonitors.push({ id, course, startDate, endDate });
  monitors[userId] = userMonitors;
  await save(monitors);
  return { id, course, startDate, endDate };
}

export async function deleteMonitor(
  id: string,
  userId: number
): Promise<boolean> {
  const monitors: Monitors = await getAllMonitors();
  const userMonitors = monitors[userId] ?? [];
  const newMonitors = userMonitors.filter((monitor) => {
    return monitor.id !== id;
  });
  if (userMonitors.length === newMonitors.length) return false;
  monitors[userId] = newMonitors;
  await save(monitors);
  return true;
}
