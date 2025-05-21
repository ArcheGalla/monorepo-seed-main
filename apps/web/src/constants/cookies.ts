export const COOKIE_OPTIONS = {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

export const SESSION_ID = "session_id";
export const USER_ID = "user_id";
export const TOKEN = "token";
