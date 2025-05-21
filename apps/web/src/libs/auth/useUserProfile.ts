import { useQuery } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user_profiles"],
    queryFn: async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) throw userError;
      if (!userData?.user) throw new Error("No user found");

      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", userData.user.id)
        .single();

      if (profileError) throw profileError;
      if (!profile) throw new Error("No profile found");

      return profile;
    },
    staleTime: 5 * 60 * 1000,
  });
};
