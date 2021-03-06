import { promises, constants } from 'fs';

const fs = promises;
const fsConstants = constants;

interface Login {
  username: string;
  password: string;
}

interface Logins {
  [key: number]: Login;
}

async function save(logins: Logins): Promise<boolean> {
  await fs.writeFile('logins.json', JSON.stringify(logins));
  console.log('Logins file has been saved.');
  return true;
}

let loginCache: Logins | null = null;

async function load(): Promise<Logins> {
  try {
    await fs.access('logins.json', fsConstants.W_OK);
    const file = await fs.readFile('logins.json');
    console.log('Logins file has been loaded.');
    return JSON.parse(file.toString()) as Logins;
  } catch (error) {
    console.error('Loading file threw error', error);
    return {};
  }
}

async function getLogins(): Promise<Logins> {
  if (!loginCache) {
    const logins = await load();
    if (!loginCache) loginCache = logins;
  }
  return loginCache;
}

export async function getLogin(userId: number): Promise<Login> {
  const logins = await getLogins();
  return logins[userId];
}

export async function addLogin(
  userId: number,
  username: string,
  password: string
): Promise<Login> {
  const logins: Logins = await getLogins();
  logins[userId] = { username, password };
  await save(logins);
  return { username, password };
}
