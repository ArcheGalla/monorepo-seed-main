import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse<unknown>> {
  const data = await request.json();

  // Template response
  return NextResponse.json(
    {
      token: "964e1db8-fb3e-4f41-b47b-bb3c4058e1d4",
    },
    { status: 200 },
  );
}
