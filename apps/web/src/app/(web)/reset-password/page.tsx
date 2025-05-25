import { Metadata } from "next";

import { ResetPassword } from "@/modules/password/reset-password";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Reset Password",
  };
};

export default function Page() {
  return <ResetPassword />;
}
