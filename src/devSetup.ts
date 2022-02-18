// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const localtunnel = require('localtunnel');

export async function devSetup(): Promise<void> {
  const tunnel = await localtunnel({ port: 3000 });

  process.env.host = tunnel.url;
}
