import 'dotenv/config';

export default {
  secret_token: process.env.JWT_SECRET_TOKEN,
  expires_in_token: process.env.JWT_TOKEN_EXPIRATION,
  secret_refresh_token: process.env.JWT_SECRET_REFRESH_TOKEN,
  expires_in_refresh_token: process.env.JWT_REFRESH_EXPIRATION,
  expires_refresh_token_days: Number(process.env.JWT_REFRESH_EXPIRATION_DAYS),
};
