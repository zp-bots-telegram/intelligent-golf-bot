import { RequestPromise, RequestPromiseOptions } from 'request-promise';
import $ from 'cheerio';
import { RequestAPI, RequiredUriUrl } from 'request';

export async function init(
  request: RequestAPI<RequestPromise, RequestPromiseOptions, RequiredUriUrl>
): Promise<Boolean> {
  const html = await request('https://www.e-s-p.com/elitelive/?clubid=3079&');
  return $('title', html).text() === 'Login';
}

export async function login(
  request: RequestAPI<RequestPromise, RequestPromiseOptions, RequiredUriUrl>,
  args: {
    userId: number;
  }
): Promise<Boolean> {
  const options: RequestPromiseOptions = {
    method: 'POST',
    baseUrl: 'https://www.e-s-p.com/elitelive/',
    form: {
      username: 'zackpollard',
      password: 'eqm2afji94snnro2mq7sn2h9zydaveo',
      gotdata: 1,
      clubid: 3079,
      Submit: 'PLEASE WAIT'
    }
  };
  const html = await request('login.php', options);
  return $('title', html).text() === 'Homepage';
}

interface Booking {
  date: string;
  course: string;
  participants: string[];
}

export async function getBookings(
  request: RequestAPI<RequestPromise, RequestPromiseOptions, RequiredUriUrl>
): Promise<Booking[]> {
  const html = await request(
    'https://www.e-s-p.com/elitelive/book_history.php'
  );
  if ($('title', html).text() !== 'Booking History') return [];
  const bookings = $('#BookHistory tbody tr', html);
  const parsedBookings: Booking[] = [];
  bookings.each((i, booking) => {
    const bookingDetails = $('td', booking);
    const dateString = bookingDetails.eq(0).html() ?? 'undefined';
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    if (currentDate.getTime() > convertDate(dateString).getTime()) {
      return;
    }
    const course = bookingDetails.eq(1).html() ?? 'undefined';
    const participants = bookingDetails
      .eq(2)
      .html()
      ?.trim()
      .replace(',', '')
      .split('<br>') ?? ['undefined'];
    parsedBookings.push({ date: dateString, course, participants });
  });
  return parsedBookings;
}

export function convertDate(date: string): Date {
  const regexp = /([0-9]+)[A-Za-z]+ ([A-Za-z]+) ([0-9]+), ([0-9]+:[0-9]+)/;
  const match = date.match(regexp);
  if (match?.length !== 5)
    throw new Error(`Date Invalid ${date} length was ${match?.length}`);
  return new Date(`${match[1]} ${match[2]} ${match[3]} ${match[4]}`);
}
