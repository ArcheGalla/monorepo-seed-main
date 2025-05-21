import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { SESSION_ID } from "@/constants/cookies";

export const clientSessionInit = (
  request: NextRequest,
  response: NextResponse,
): NextResponse => {
  let uuid = request.cookies.get(SESSION_ID)?.value || "";

  if (!uuid) {
    uuid = uuidv4();

    response.cookies.set(SESSION_ID, uuid);
  }

  return response;
};
