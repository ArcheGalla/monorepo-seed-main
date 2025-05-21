import { Metadata } from "next";

import { UpdatePassword } from "@/modules/password/update-password";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Update Password",
  };
};

export default function Page() {
  return <UpdatePassword />;
}
