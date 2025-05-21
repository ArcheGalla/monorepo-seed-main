"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { FC, useState } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

import { useCountdownTimer } from "../hooks/useCountdown";
import { errorNotification } from "../shared/notifications/error-notification";
import { successNotification } from "../shared/notifications/success-notification";

import { formatTime } from "@/utils/helper/value-format";
import { createClient } from "@/utils/supabase/client";

interface EmailConfirmationResendModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const EmailConfirmationResendModal: FC<
  EmailConfirmationResendModalProps
> = ({ isOpen, onOpenChange }) => {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCountingStarted, setIsCountingStarted] = useState(false);

  const { countdown, isCountingDown, reset } = useCountdownTimer({
    duration: 90,
    isActive: isCountingStarted,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email,
    });

    setIsLoading(false);

    if (error) {
      errorNotification({
        description: error.message,
      });
    } else {
      successNotification({
        description: "Email sent successfully",
      });

      setIsCountingStarted(true);
      reset();
    }
  };

  return (
    <Modal
      classNames={{
        body: "py-3",
        backdrop: "bg-overlay/80",
        closeButton: "h-10 w-10 flex items-center justify-center",
      }}
      isOpen={isOpen}
      size="sm"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 items-center justify-center pt-7">
          <h2 className="text-2xl font-bold text-center relative">
            Send Confirmation Email
          </h2>
        </ModalHeader>

        <ModalBody>
          <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <Input
              label="Email"
              radius="sm"
              size="md"
              type="email"
              value={email}
              onValueChange={setEmail}
            />

            <Button
              className="w-full font-normal text-base bg-btnPrimary text-white"
              color="secondary"
              isDisabled={!email || isCountingDown}
              isLoading={isLoading}
              radius="sm"
              size="lg"
              type="submit"
              variant="solid"
            >
              {isCountingDown
                ? `Resend after ${formatTime(countdown)}`
                : "Resend Email"}
            </Button>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
