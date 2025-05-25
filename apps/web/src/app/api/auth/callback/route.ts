import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { setUserJWT } from "@/utils/cookies/jwt";
import { sendWelcomeToVegasBonanzaEmail } from "@/utils/emails/send-email-template";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/auth-error`;

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(redirectUrl);
    }

    if (data) {
      const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/lobby`;

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

      await sendWelcomeToVegasBonanzaEmail(
        data.user.email!,
        userData?.full_name,
      );

      await setUserJWT(userData);

      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.redirect(redirectUrl);
}
