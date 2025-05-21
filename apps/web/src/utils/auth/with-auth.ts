import { NextRequest } from "next/server";

import { ERRORS } from "@/constants/errors";
import { TOKEN } from "@/constants/cookies";

type Handler = (req: NextRequest, context?: any) => Promise<Response>;

export function withAuth(handler: Handler): Handler {
  return async (req, context) => {
    const token = req.cookies.get(TOKEN)?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: ERRORS.UNAUTHORIZED }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return handler(req, context);
  };
}
