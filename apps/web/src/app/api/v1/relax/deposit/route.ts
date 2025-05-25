import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse<unknown>> {
  const data = await request.json();

  // Template response
  return NextResponse.json(
    {
      balance: 53600,
      txid: 29912988,
      remotetxid: "1690944",
    },
    { status: 200 },
  );
}
