import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "skanda_admin_session";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "skanda@123";
const SESSION_SECRET = "skanda-estates-admin-session-2026";

function createAdminToken() {
  return crypto
    .createHash("sha256")
    .update(`skanda-estates:${ADMIN_USERNAME}:${ADMIN_PASSWORD}:${SESSION_SECRET}`)
    .digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function validateAdminCredentials(username: string, password: string) {
  return safeEqual(username, ADMIN_USERNAME) && safeEqual(password, ADMIN_PASSWORD);
}

export function setAdminSession() {
  cookies().set(ADMIN_COOKIE, createAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export function clearAdminSession() {
  cookies().delete(ADMIN_COOKIE);
}

export function hasAdminSession() {
  const token = cookies().get(ADMIN_COOKIE)?.value || "";
  const expected = createAdminToken();

  return Boolean(token && safeEqual(token, expected));
}
