import { availableTimesCommand } from 'command/availableTimes';
import { bookingsCommand } from 'command/bookings';
import { loginCommand } from 'command/login';
import { monitorCommand } from 'command/monitor';
import { Bot } from 'grammy';
import { monitorsCommand } from 'command/monitors';
import { bookTimeCommand } from 'command/bookTime';
import { autoBookingsCommand } from 'command/autoBookings';
import { autoBookCommand } from 'command/autoBook';

export function registerCommands(bot: Bot): void {
  availableTimesCommand(bot);
  bookingsCommand(bot);
  loginCommand(bot);
  monitorCommand(bot);
  monitorsCommand(bot);
  bookTimeCommand(bot);
  autoBookCommand(bot);
  autoBookingsCommand(bot);
}
