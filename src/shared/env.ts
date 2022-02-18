export const getEnv = (name: string): string => {
  const value = process.env[name];
  if (value === undefined) {
    throw `Environment variable ${name} is not set`;
  }
  return value;
};
