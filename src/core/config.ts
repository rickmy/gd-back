/* eslint-disable prettier/prettier */
export default () => ({
  port: process.env.PORT || 3000,
  database: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  URL_SUPABASE: process.env.URL_SUPABASE,
  ANON_PUBLIC_KEY: process.env.ANON_PUBLIC_KEY,
  SERVICE_KEY: process.env.SERVICE_KEY,
  PASS_SUPABASE: process.env.PASS_SUPABASE,
  frontUrl: process.env.FRONT_URL,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  mailFrom: process.env.MAIL_FROM,
});
