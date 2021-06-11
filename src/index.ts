import { echoCommand } from './commands/echo';
import TelegramBot from 'node-telegram-bot-api';
import dotenv, { DotenvParseOutput } from 'dotenv';
import { golfCommand } from './commands/golf';

export async function handler() {
  const env = dotenv.config().parsed;
  if (!env?.BOT_TOKEN) {
    throw new Error('BOT_TOKEN was undefined');
  }

  const bot = new TelegramBot(env.BOT_TOKEN, { polling: true });
  echoCommand(bot);
  golfCommand(bot);
}

handler().then((r) => console.log('Bot Running'));
