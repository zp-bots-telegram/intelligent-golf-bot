import { deleteMonitor, getUsersMonitors } from 'storage/monitors';
import { Telegraf } from 'telegraf';
import { CallbackQuery } from 'telegraf/typings/core/types/typegram';

type DataCallbackQuery = CallbackQuery & {
  data: string;
};

export function monitorsCommand(bot: Telegraf): void {
  bot.on('callback_query', async (ctx) => {
    const query = ctx.callbackQuery as DataCallbackQuery;
    if (query.data) {
      const id = query.data;
      if (!(await deleteMonitor(id, query.from.id))) {
        await ctx.answerCbQuery('Monitor Delete Failed');
        return;
      }
      await ctx.deleteMessage(ctx.callbackQuery.message?.message_id);
      await ctx.answerCbQuery('Monitor Deleted');
    }
  });
  bot.command('monitors', async (ctx) => {
    const userId = ctx.from.id;

    const monitors = await getUsersMonitors(userId);

    if (!monitors || monitors.length === 0) {
      await ctx.reply('No Active Monitors');
      return;
    }

    await ctx.replyWithHTML('<b>Monitors</b>');

    await Promise.all(
      monitors.map(async (monitor) => {
        const { startDate, endDate, course } = monitor;
        let message = `<b>Course:</b> ${course}\n`;
        message += `<b>Start Date:</b> ${startDate.toISOString()}\n`;
        message += `<b>End Date:</b> ${endDate.toISOString()}`;
        await ctx.replyWithHTML(message, {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [[{ callback_data: monitor.id, text: 'Delete' }]]
          }
        });
      })
    );
  });
}
