"use client";

import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FC, useEffect, useState } from "react";

import { errorNotification } from "../shared/notifications/error-notification";

import { createClient } from "@/utils/supabase/client";
import { Logo } from "@/components/atoms/logo";

export const ResetPassword: FC = () => {
  const supabase = createClient();

  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);

  const sendResetEmail = async () => {
    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    setIsLoading(false);

    if (error) {
      errorNotification({
        description: error.message,
      });

      return false;
    }

    setCountdown(60);
    setIsCountingDown(true);

    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await sendResetEmail();

    if (success) setIsEmailSent(true);
  };

  const onResend = async () => {
    await sendResetEmail();
  };

  useEffect(() => {
    let timer: number;

    if (isCountingDown && countdown > 0) {
      timer = window.setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCountingDown(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isCountingDown, countdown]);

  return (
    <Card
      className="relative max-w-[400px] w-full mx-auto my-20 bg-content1 flex items-center flex-col p-5 gap-8 text-center"
      shadow="sm"
    >
      <Button
        isIconOnly
        as={Link}
        className="absolute top-4 left-4"
        href="/"
        radius="full"
        startContent={<Icon icon="lucide:arrow-left" />}
      />

      <Logo imageClassName="ml-0" />

      {!isEmailSent ? (
        <>
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold text-white">Reset Password</h1>
            <p className="text-sm text-default-500">
              Please enter your email below.
            </p>
          </div>

          <Card className="w-full bg-content2 p-6">
            <Form className="grid gap-6" onSubmit={onSubmit}>
              <Input
                label="Email"
                radius="sm"
                type="email"
                value={email}
                variant="bordered"
                onValueChange={setEmail}
              />

              <Button
                className="bg-btnPrimary"
                isDisabled={!email}
                isLoading={isLoading}
                radius="sm"
                size="lg"
                type="submit"
              >
                Reset Password
              </Button>
            </Form>
          </Card>
        </>
      ) : (
        <div className="grid gap-4">
          <p className="text-xl font-bold text-white">
            Check your email to reset your password.
          </p>
          <Button
            className="bg-btnPrimary"
            isDisabled={isCountingDown}
            isLoading={isLoading}
            radius="sm"
            size="lg"
            type="button"
            onPress={onResend}
          >
            Resend {isCountingDown ? `${countdown}` : ""}
          </Button>
        </div>
      )}
    </Card>
  );
};
