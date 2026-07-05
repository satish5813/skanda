import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "skanda_admin_session";

function getPassword() {
  return process.env.ADMIN_PASSWORD?.trim() || "";
}

function getSecret() {
  return process.env.AUTH_SECRET?.trim() || "";
}

export function isAdminConfigured() {
  return Boolean(getPassword() && getSecret());
}

function createAdminToken() {
  const password = getPassword();
  const secret = getSecret();

  if (!password || !secret) {
    return "";
  }

  return crypto
    .createHash("sha256")
    .update(`skanda-estates:${password}:${secret}`)
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

export function validateAdminPassword(password: string) {
  const configuredPassword = getPassword();

  if (!configuredPassword) {
    return false;
  }

  return safeEqual(password, configuredPassword);
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
  if (!isAdminConfigured()) {
    return false;
  }

  const token = cookies().get(ADMIN_COOKIE)?.value || "";
  const expected = createAdminToken();

  return Boolean(token && expected && safeEqual(token, expected));
}
