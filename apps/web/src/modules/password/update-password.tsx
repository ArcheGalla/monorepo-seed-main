"use client";

import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

import { errorNotification } from "../shared/notifications/error-notification";
import { successNotification } from "../shared/notifications/success-notification";

import { createClient } from "@/utils/supabase/client";
import { Logo } from "@/components/atoms/logo";

export const UpdatePassword: FC = () => {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    setIsLoading(false);

    if (error) {
      errorNotification({
        description: error.message,
      });

      return;
    }
    successNotification({
      description: "Password updated successfully",
    });

    router.push("/");
  };

  return (
    <Card
      className="max-w-[400px] w-full mx-auto my-20 bg-content1 flex items-center flex-col p-5 gap-8 text-center"
      shadow="sm"
    >
      <Logo imageClassName="ml-0" />

      <div className="grid gap-1">
        <p className="text-xl font-bold text-white">Create new password</p>
      </div>

      <Card className="w-full bg-content2 p-6">
        <Form className="grid gap-6" onSubmit={onSubmit}>
          <Input
            endContent={
              <button
                className="focus:outline-none mb-3"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <Icon className="text-default-400" icon="lucide:eye" />
                ) : (
                  <Icon className="text-default-400" icon="lucide:eye-off" />
                )}
              </button>
            }
            label="Password"
            radius="sm"
            size="md"
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            variant="bordered"
            onValueChange={setPassword}
          />

          <Button
            className="bg-btnPrimary"
            isDisabled={!password}
            isLoading={isLoading}
            radius="sm"
            size="lg"
            type="submit"
          >
            Confirm
          </Button>
        </Form>
      </Card>
    </Card>
  );
};
