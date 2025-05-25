import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/utils/supabase/client";
import { logout } from "@/utils/auth/logout";
import { successNotification } from "@/modules/shared/notifications/success-notification";
import { errorNotification } from "@/modules/shared/notifications/error-notification";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogOut = async () => {
    setIsLoading(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setIsLoading(false);
      errorNotification({ description: error.message });
    } else {
      await logout();
      successNotification({ description: "Logged out successfully" });
      router.push("/");
    }
  };

  return { handleLogOut, isLoading };
};
