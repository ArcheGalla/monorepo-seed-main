import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { setUserJWT } from "@/utils/cookies/jwt";

export async function POST() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!data || error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(data.user);

  const { data: userData, error: userError } = await supabase
    .from("user_profiles")
    .select(
      `
    *,
    wallets (
      id,
      currency_type,
      balance,
      is_redeemable
    )
  `,
    )
    .eq("user_id", data.user.id)
    .maybeSingle();

  console.log(userError);

  console.log(userData);

  if (userError) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  console.log(userData);

  await setUserJWT(userData);

  return NextResponse.json({ ok: true });
}
