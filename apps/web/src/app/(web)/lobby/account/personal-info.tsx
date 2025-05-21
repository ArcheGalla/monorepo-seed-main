"use client";

import { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "@heroui/skeleton";

import { createClient } from "@/utils/supabase/client";
import { useUserProfile } from "@/libs/auth/useUserProfile";
import { useUpdateUserProfile } from "@/libs/auth/useUpdateUserProfile";
import { errorNotification } from "@/modules/shared/notifications/error-notification";
import { successNotification } from "@/modules/shared/notifications/success-notification";
import { useLogout } from "@/modules/hooks/useLogOut";

export const PersonalInfo = () => {
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "+1 (555) 123-4567",
  });

  const [showSaveButton, setShowSaveButton] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const { handleLogOut, isLoading } = useLogout();
  const { data: profile, isFetched: isProfileFetched } = useUserProfile();

  const { mutate, isPending } = useUpdateUserProfile();

  const handleInputChange = (key: string, value: string) => {
    setShowSaveButton(true);
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSaveChanges = () => {
    setIsSaveLoading(true);
    mutate(
      {
        data: {
          full_name: formData.full_name,
        },
      },
      {
        onSuccess: () => {
          setShowSaveButton(false);
          successNotification({
            description: "Profile updated successfully",
          });
          setIsSaveLoading(false);
        },
        onError: (error) => {
          errorNotification({
            description: error.message,
          });
          setIsSaveLoading(false);
        },
      },
    );
  };

  useEffect(() => {
    if (profile) {
      setFormData({
        ...formData,
        full_name: profile?.full_name || "",
      });
    }
  }, [profile]);

  return (
    <Card className="mb-8 bg-content1" shadow="sm">
      <CardBody className="p-4">
        <div className="grid grid-cols-1 gap-4">
          <Skeleton className="rounded-xl" isLoaded={isProfileFetched}>
            <Input
              classNames={{
                label: "text-default-200",
                input: "text-white",
                inputWrapper: "bg-content1",
              }}
              label="Full Name"
              radius="md"
              value={formData.full_name}
              variant="bordered"
              onValueChange={(value) => handleInputChange("full_name", value)}
            />
          </Skeleton>

          <Skeleton className="rounded-xl" isLoaded={isProfileFetched}>
            <Input
              isDisabled
              isReadOnly
              classNames={{
                inputWrapper: "bg-content1",
              }}
              label="Email Address"
              radius="md"
              value={profile?.email}
              variant="bordered"
            />
          </Skeleton>

          <Skeleton className="rounded-xl" isLoaded={isProfileFetched}>
            <Input
              isDisabled
              classNames={{
                inputWrapper: "bg-content1",
              }}
              label="Phone Number"
              radius="md"
              value={formData.phone}
              variant="bordered"
              onValueChange={(value) => handleInputChange("phone", value)}
            />
          </Skeleton>
        </div>

        <div className="mt-6 flex justify-between">
          <Skeleton className="rounded-xl" isLoaded={isProfileFetched}>
            <Button
              className="font-medium"
              color="danger"
              isLoading={isLoading}
              radius="md"
              onPress={handleLogOut}
            >
              Log Out
            </Button>
          </Skeleton>

          <Skeleton className="rounded-xl" isLoaded={isProfileFetched}>
            <Button
              className="font-medium"
              color="warning"
              isDisabled={!showSaveButton || isPending}
              isLoading={isSaveLoading}
              radius="md"
              onPress={handleSaveChanges}
            >
              Save Changes
            </Button>
          </Skeleton>
        </div>
      </CardBody>
    </Card>
  );
};
