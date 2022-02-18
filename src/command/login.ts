import rp from 'request-promise';
import { Telegraf } from 'telegraf';

import { login } from 'requests/golfBooking';
import { addLogin } from 'storage/logins';

export function loginCommand(bot: Telegraf): void {
  bot.command('login', async (ctx) => {
    const msg = ctx.message;
    const command = ctx.message.text;
    const match = /\/login (\S+) ([0-9A-Za-z]+)/i.exec(command);

    if (!msg.from) {
      return;
    }
    const userId = msg.from.id;
    if (match?.length !== 3) {
      console.log(match?.length);
      await ctx.reply('Usage is /login {username} {password}');
      return;
    }
    const username = match[1];
    const password = match[2];

    const request = rp.defaults({ jar: true, followAllRedirects: true });

    if (!msg.from) {
      return;
    }

    const loginResult = await login(request, {
      username,
      password
    });

    let message = 'Login failed, incorrect details';

    if (loginResult) {
      message = 'Login succeeded, credentials saved';
      await addLogin(userId, username, password);
    }

    await ctx.replyWithHTML(message);
  });
}
