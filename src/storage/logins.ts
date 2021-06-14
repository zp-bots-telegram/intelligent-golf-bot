import { promises } from 'fs';

const fs = promises;

interface Logins {
  [key: number]: string;
}

export async function save(logins: Logins): Promise<Boolean> {
  await fs.writeFile('logins.json', JSON.stringify(logins));
  console.log('JSON file has been saved.');
  return true;
}

async function load(): Promise<Logins> {
  const file = await fs.readFile('logins.json');
  console.log('JSON file has been loaded.');
  return JSON.parse(file.toString()) as Logins;
}
