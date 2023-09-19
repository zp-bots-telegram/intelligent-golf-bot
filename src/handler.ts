import express, { json } from 'express';

import { getEnv } from 'shared/env';
import { devSetup } from 'devSetup';
import { registerCommands } from 'command/commands';
import { scheduledAvailableTimesMonitor } from 'scheduled/availableTimesMonitor';
import { Bot, webhookCallback } from 'grammy';
import { v4 as uuid } from 'uuid';
import { scheduledAutoBookingsMonitor } from 'scheduled/autoBookingsMonitor';
import { scheduledRecurringBookingsMonitor } from 'scheduled/recurringBookingsMonitor';

export async function handler(): Promise<void> {
  const token = process.env.BOT_TOKEN;
  if (!token) {
    throw new Error('BOT_TOKEN must be provided!');
  }

  if (getEnv('NODE_ENV') === 'development') {
    await devSetup();
  }

  const bot = new Bot(token);

  registerCommands(bot);

  scheduledAvailableTimesMonitor(bot);
  scheduledAutoBookingsMonitor(bot);
  scheduledRecurringBookingsMonitor(bot);

  const host = getEnv('host');
  const secretPath = `/grammy/${uuid()}`;

  await bot.api.setWebhook(`${host}${secretPath}`);

  const app = express();
  app.use(json());
  app.use(secretPath, webhookCallback(bot, 'express', undefined, 60000));
  app.listen(4123, () => {
    console.log('Webhook Server Started!');
  });
}

handler()
  .then(() => console.log('Bot Running'))
  .catch((error) => {
    console.error('Uncaught Error Thrown', error);
  });
