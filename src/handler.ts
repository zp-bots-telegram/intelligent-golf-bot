/* eslint-disable no-console */
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

import { bookingsCommand } from './commands';
import { loginCommand } from './commands/login';

// eslint-disable-next-line require-await
export async function handler() {
  const env = dotenv.config().parsed;
  if (!env?.BOT_TOKEN) {
    throw new Error('BOT_TOKEN was undefined');
  }

  const bot = new TelegramBot(env.BOT_TOKEN, { polling: true });

  registerCommands(bot);
}

function registerCommands(bot: TelegramBot) {
  bookingsCommand(bot);
  loginCommand(bot);
}

handler()
  .then(() => console.log('Bot Running'))
  .catch((error) => {
    console.error('Uncaught Error Thrown', error);
  });
