import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse<unknown>> {
  const data = await request.json();

  // Template response
  return NextResponse.json(
    {
      customerid: "12345",
      countrycode: "SE",
      cashiertoken: "801642c4-f4a7-446e-8b60-0421fd9bd45e",
      customercurrency: "SEK",
      balance: 53600,
      jurisdiction: "SE",
      classification: "vip",
    },
    { status: 200 },
  );
}
