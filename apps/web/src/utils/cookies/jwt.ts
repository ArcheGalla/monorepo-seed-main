import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const USER_JWT_COOKIE_NAME = "session-token";

const jwtSecret = process.env.NEXT_JWT_SECRET!;
const jwtSecretUint8 = new TextEncoder().encode(jwtSecret);

const USER_JWT_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NEXT_PUBLIC_ENV === "production",
  path: "/",
};

export const generateJWTToken = async (payload: object) => {
  const token = await new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(jwtSecretUint8);

  return token;
};

export const setUserJWT = async (payload: object) => {
  const token = await generateJWTToken(payload);
  const cookieStore = await cookies();

  cookieStore.set(USER_JWT_COOKIE_NAME, token, USER_JWT_COOKIE_OPTIONS);
};

export const verifyUserJWT = async (token: string | null | undefined) => {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, jwtSecretUint8);

    return payload;
  } catch (error) {
    console.error("Error verifying JWT:", error);

    return null;
  }
};

export const getDecodedUserJWT = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(USER_JWT_COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, jwtSecretUint8);

    return payload;
  } catch {
    return null;
  }
};

export const setJWTToken = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set(USER_JWT_COOKIE_NAME, token, USER_JWT_COOKIE_OPTIONS);
};

export const getJWTToken = async () => {
  const cookieStore = await cookies();

  return cookieStore.get(USER_JWT_COOKIE_NAME)?.value || null;
};

export const deleteJWTToken = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(USER_JWT_COOKIE_NAME);
};
