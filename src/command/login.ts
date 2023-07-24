import rp from 'request-promise';
import { login } from 'requests/golfBooking';
import { addLogin } from 'storage/logins';
import { Bot } from 'grammy';

export function loginCommand(bot: Bot): void {
  bot.on('message').command('login', async (ctx) => {
    const msg = ctx.msg;
    const command = msg.text;
    const match = /\/login (\S+) ([0-9A-Za-z]+)/i.exec(command);

    const userId = msg.from.id;
    if (match?.length !== 3) {
      await ctx.reply('Usage is /login {username} {password}');
      return;
    }
    const username = match[1];
    const password = match[2];

    const request = rp.defaults({ jar: rp.jar(), followAllRedirects: true });

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

    await ctx.reply(message, { parse_mode: 'HTML' });
  });
}
