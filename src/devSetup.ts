// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const localtunnel = require('localtunnel');

export async function devSetup(): Promise<void> {
  const tunnel = await localtunnel({ port: 4123 });

  process.env.host = tunnel.url;
}
