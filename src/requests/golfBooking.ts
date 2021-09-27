import $ from 'cheerio';

import { RequestPromise, RequestPromiseOptions } from 'request-promise';
import { RequestAPI, RequiredUriUrl } from 'request';

export async function login(
  request: RequestAPI<RequestPromise, RequestPromiseOptions, RequiredUriUrl>,
  args: {
    username: string;
    password: string;
  }
): Promise<Boolean> {
  const options: RequestPromiseOptions = {
    method: 'POST',
    baseUrl: 'https://cainhoewood.intelligentgolf.co.uk/',
    form: {
      task: 'login',
      topmenu: 1,
      memberid: args.username,
      pin: args.password,
      Submit: 'Login'
    }
  };
  const html = await request('', options);
  return $('title', html).text().includes('Welcome');
}

interface BookingDetails {
  startingTee: string;
  holes: string;
  price: string;
  servicesBooked: string;
  participants: string[];
}

interface Booking {
  date: string;
  time: string;
  playerCount: string;
  bookingId: string;
  moreDetails: BookingDetails;
}

export async function getBookings(
  request: RequestAPI<RequestPromise, RequestPromiseOptions, RequiredUriUrl>
): Promise<Booking[]> {
  const html = await request('https://cainhoewood.intelligentgolf.co.uk/');
  if (!$('title', html).text().includes('Welcome')) return [];
  const bookings = $('div#myteetimes tr', html);
  const parsedBookings: Booking[] = [];
  await Promise.all(
    bookings.map(async (i, booking) => {
      if (i === bookings.length - 1) return;
      const bookingDetails = $('td', booking);
      const date = bookingDetails.eq(0).html() ?? 'Unavailable';
      const time = bookingDetails.eq(1).html() ?? 'Unavailable';
      const playerCount = bookingDetails.eq(2).html() ?? 'Unavailable';
      const bookingId =
        bookingDetails.eq(3).find('a').attr('href')?.split('=')[1] ??
        'Unavailable';

      parsedBookings.push({
        date,
        time,
        playerCount,
        bookingId,
        moreDetails: await getBookingDetails(request, { bookingId })
      });
    })
  );

  console.log(JSON.stringify(parsedBookings, null, 2));
  return parsedBookings;
}

export async function getBookingDetails(
  request: RequestAPI<RequestPromise, RequestPromiseOptions, RequiredUriUrl>,
  args: {
    bookingId: string;
  }
): Promise<BookingDetails> {
  const html = await request(
    `https://cainhoewood.intelligentgolf.co.uk/member_teetime.php?edit=${args.bookingId}`
  );
  const bookingDetails = $('div#teebooking_info tr', html);
  const participantDetails = $('div#teebooking_players tr', html);

  const startingTee = bookingDetails.eq(1).find('td').html() ?? 'Unavailable';
  const holes = bookingDetails.eq(3).find('td').html() ?? 'Unavailable';
  const price = bookingDetails.eq(4).find('td').html() ?? 'Unavailable';
  const servicesBooked =
    bookingDetails.eq(5).find('td').html() ?? 'Unavailable';

  const participants: string[] = [];
  participantDetails.each((i, participant) => {
    if (i === participantDetails.length - 1) return;
    const parsed = $('td', participant).eq(1).text().split('(')[0].trim() ?? '';
    if (parsed !== 'Enter Details') participants.push(parsed);
  });

  return {
    startingTee,
    participants,
    servicesBooked,
    price,
    holes
  };
}

export function convertDate(date: string): Date {
  const regexp = /([0-9]+)[A-Za-z]+ ([A-Za-z]+) ([0-9]+), ([0-9]+:[0-9]+)/;
  const match = date.match(regexp);
  if (match?.length !== 5)
    throw new Error(`Date Invalid ${date} length was ${match?.length}`);
  return new Date(`${match[1]} ${match[2]} ${match[3]} ${match[4]}`);
}
