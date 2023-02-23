import { deleteMonitor, getUsersMonitors } from 'storage/monitors';
import { Bot } from 'grammy';

export function monitorsCommand(bot: Bot): void {
  bot.on('callback_query', async (ctx) => {
    const query = ctx.callbackQuery;
    if (query.data && query.data.startsWith('monitor')) {
      const id = query.data.split('-')[1];
      if (!(await deleteMonitor(id, query.from.id))) {
        await ctx.answerCallbackQuery('Monitor Delete Failed');
        return;
      }
      await ctx.deleteMessage();
      await ctx.answerCallbackQuery('Monitor Deleted');
    }
  });

  bot.on('message').command('monitors', async (ctx) => {
    const userId = ctx.msg.from?.id;

    const monitors = await getUsersMonitors(userId);

    if (!monitors || monitors.length === 0) {
      await ctx.reply('No Active Monitors');
      return;
    }

    await ctx.reply('<b>Monitors</b>', { parse_mode: 'HTML' });

    await Promise.all(
      monitors.map(async (monitor) => {
        const { startDate, endDate, course } = monitor;
        let message = `<b>Course:</b> ${course}\n`;
        message += `<b>Start Date:</b> ${startDate.toISOString()}\n`;
        message += `<b>End Date:</b> ${endDate.toISOString()}`;
        await ctx.reply(message, {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ callback_data: `monitor-${monitor.id}`, text: 'Delete' }]
            ]
          }
        });
      })
    );
  });
}
