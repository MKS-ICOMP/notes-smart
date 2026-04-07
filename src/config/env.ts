import 'dotenv/config';

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3333,
  frontendOrigin: getRequiredEnv('FRONTEND_ORIGIN'),
  sessionSecret: getRequiredEnv('SESSION_SECRET'),
};
