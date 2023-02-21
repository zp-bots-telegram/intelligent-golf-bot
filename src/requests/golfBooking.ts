import $ from 'cheerio';

import { RequestPromise, RequestPromiseOptions } from 'request-promise';
import { RequestAPI, RequiredUriUrl } from 'request';

export async function login(
  request: RequestAPI<RequestPromise, RequestPromiseOptions, RequiredUriUrl>,
  args: {
    username: string;
    password: string;
  }
): Promise<boolean> {
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

interface TimeSlot {
  time: string;
  bookingForm: { [x: string]: string };
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

  return parsedBookings;
}

function parseBookingDetailsPage(html: string) {
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

export async function getBookingDetails(
  request: RequestAPI<RequestPromise, RequestPromiseOptions, RequiredUriUrl>,
  args: {
    bookingId: string;
  }
): Promise<BookingDetails> {
  const html: string = await request(
    `https://cainhoewood.intelligentgolf.co.uk/member_teetime.php?edit=${args.bookingId}`
  );
  return parseBookingDetailsPage(html);
}

// eslint-disable-next-line no-shadow
export enum Course {
  // eslint-disable-next-line no-unused-vars
  Manor = 1,
  // eslint-disable-next-line no-unused-vars
  Castle = 2
}

export async function getCourseAvailability(
  request: RequestAPI<RequestPromise, RequestPromiseOptions, RequiredUriUrl>,
  args: {
    date: Date;
    course: Course;
  }
): Promise<TimeSlot[]> {
  const day = args.date.getDate();
  const month = args.date.getMonth() + 1;
  const year = args.date.getFullYear();
  const date = `${day}-${month}-${year}`;
  const options: RequestPromiseOptions = {
    method: 'GET',
    baseUrl: 'https://cainhoewood.intelligentgolf.co.uk/',
    qs: {
      date,
      course: args.course.valueOf()
    }
  };
  const html = await request('/memberbooking/', options);
  const rows = $('tr.cantreserve', html);

  const availableTimes: TimeSlot[] = [];

  rows.each((i, row) => {
    // const bookingLink = $('a.inlineBooking', row);
    const peopleBooked = $('td.tbooked', row);
    const blocked = $('td.tblocked', row).length !== 0;
    const time = $('th', row).text();
    const form = $('td form > input', row);
    const bookingForm: { [x: string]: string } = {};
    form.toArray().forEach((field) => {
      bookingForm[field.attribs.name] = field.attribs.value;
    });
    if (peopleBooked.length === 0 && !blocked) {
      availableTimes.push({ time, bookingForm });
    }
  });

  return availableTimes;
}

export async function bookTimeSlot(
  request: RequestAPI<RequestPromise, RequestPromiseOptions, RequiredUriUrl>,
  args: {
    timeSlot: TimeSlot;
  }
): Promise<BookingDetails | null> {
  const options: RequestPromiseOptions = {
    method: 'GET',
    baseUrl: 'https://cainhoewood.intelligentgolf.co.uk/',
    qs: {
      numslots: 1,
      ...args.timeSlot.bookingForm
    }
  };
  const html = await request('/memberbooking/', options);
  const confirmation = $(
    '#globalwrap > div.user-messages.alert.user-message-success.alert-success > ul > li > strong',
    html
  );

  if (confirmation) {
    const details = parseBookingDetailsPage(html);
    console.log(details);
    return details;
  }
  return null;
}
