import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<boolean>> {
  return NextResponse.json(true);
}
