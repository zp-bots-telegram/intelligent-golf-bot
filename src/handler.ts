import dotenv from 'dotenv';

import TelegramBot from 'node-telegram-bot-api';

import { bookingsCommand } from './commands';
import { loginCommand } from './commands/login';
import { availableTimesCommand } from './commands/availableTimes';

// eslint-disable-next-line require-await
export async function handler() {
  dotenv.config();
  if (!process.env.BOT_TOKEN) {
    throw new Error('BOT_TOKEN was undefined');
  }

  const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

  registerCommands(bot);
}

function registerCommands(bot: TelegramBot) {
  bookingsCommand(bot);
  loginCommand(bot);
  availableTimesCommand(bot);
}

handler()
  .then(() => console.log('Bot Running'))
  .catch((error) => {
    console.error('Uncaught Error Thrown', error);
  });
