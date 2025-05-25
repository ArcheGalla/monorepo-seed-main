import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

interface UpdateProfileInput {
  data: {
    full_name?: string;
    phone?: string;
    [key: string]: any;
  };
}

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: UpdateProfileInput) => {
      const { data: sessionData, error } = await supabase.auth.getSession();

      if (error || !sessionData?.session) throw new Error("Not authenticated");

      const userId = sessionData.session.user.id;

      const { error: updateError } = await supabase
        .from("user_profiles")
        .update(data)
        .eq("user_id", userId);

      if (updateError) throw updateError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profiles"] });
    },
  });
};
