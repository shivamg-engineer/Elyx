import jwt from "jsonwebtoken";
import type { JwtPayload } from "./auth.types.ts";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_SECRET;
if (!ACCESS_SECRET) {
  throw new Error("ACCESS_SECRET is missing in .env");
}

const REFRESH_SECRET = process.env.REFRESH_SECRET;
if (!REFRESH_SECRET) {
  throw new Error("REFRESH_SECRET is missing in .env");
}

// Access Token: valid for 15 minutes
export const signAccessToken = (
  payload: Omit<JwtPayload, "iat" | "exp">
) => {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

// Refresh Token: valid for 7 days
export const signRefreshToken = (
  payload: Omit<JwtPayload, "iat" | "exp">
) => {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

// Verify Access Token
export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
};

// Verify Refresh Token
export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
};
