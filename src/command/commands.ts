import { availableTimesCommand } from 'command/availableTimes';
import { bookingsCommand } from 'command/bookings';
import { loginCommand } from 'command/login';
import { monitorAvailableTimesCommand } from 'command/monitorAvailableTimes';
import { Bot } from 'grammy';
import { monitorsCommand } from 'command/monitors';

export function registerCommands(bot: Bot): void {
  availableTimesCommand(bot);
  bookingsCommand(bot);
  loginCommand(bot);
  monitorAvailableTimesCommand(bot);
  monitorsCommand(bot);
}
