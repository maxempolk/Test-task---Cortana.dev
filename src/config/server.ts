import jwt from "jsonwebtoken";
import ms from "ms";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not set in environment variables");
}

const expiresInRefreshToken = process.env.JWT_REFRESH_EXPIRES_IN as ms.StringValue;

if (!expiresInRefreshToken) {
  throw new Error("JWT_REFRESH_EXPIRES_IN is not set in environment variables");
}

const expiresIn = process.env.JWT_EXPIRES_IN as ms.StringValue;

if (!expiresIn) {
  throw new Error("JWT_EXPIRES_IN is not set in environment variables");
}

const baseUrl = process.env.BASE_URL;

if (!baseUrl) {
  throw new Error("BASE_URL is not set in environment variables");
}

interface Config {
  jwt: {
    secret: jwt.Secret;
    expiresIn: ms.StringValue;
    expiresInRefreshToken: ms.StringValue;
  };
  baseUrl: string;
}

const config: Config = {
  jwt: {
    secret: jwtSecret,
    expiresIn: expiresIn,
    expiresInRefreshToken: expiresInRefreshToken,
  },
  baseUrl: baseUrl,
};

export default config;
