"use client";

import React, { FC, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Icon } from "@iconify/react";
import { Image } from "@heroui/image";
import { Divider } from "@heroui/divider";

import { errorNotification } from "../shared/notifications/error-notification";

import { createClient } from "@/utils/supabase/client";
import { formatTime } from "@/utils/helper/value-format";
import animal1 from "@/assets/Rabbit.webp";

interface EmailVerificationModalProps {
  email: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  backToSignUp?: () => void;
}

export const EmailVerificationModal: FC<EmailVerificationModalProps> = ({
  email,
  isOpen,
  onOpenChange,
  backToSignUp,
}) => {
  const supabase = createClient();

  const [countdown, setCountdown] = React.useState(300);
  const [isCountingDown, setIsCountingDown] = React.useState(true);

  const handleResend = async () => {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email,
    });

    if (error) {
      errorNotification({
        description: error.message,
      });

      return;
    }
    setCountdown(300);
    setIsCountingDown(true);
  };

  useEffect(() => {
    if (isOpen) {
      setCountdown(300);
      setIsCountingDown(true);
    } else {
      setIsCountingDown(false);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: number;

    if (isOpen && isCountingDown && countdown > 0) {
      timer = window.setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCountingDown(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, isCountingDown, isOpen]);

  return (
    <Modal
      hideCloseButton
      classNames={{
        body: "py-3",
        backdrop: "bg-overlay/80",
        closeButton: "h-10 w-10 flex items-center justify-center",
      }}
      isDismissable={false}
      isOpen={isOpen}
      size="sm"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center justify-center pt-7">
              <Button
                isIconOnly
                className="absolute left-2"
                variant="light"
                onPress={backToSignUp}
              >
                <Icon icon="lucide:chevron-left" />
              </Button>
              <h2 className="text-2xl font-bold text-center relative">
                Check Your Email
              </h2>
            </ModalHeader>

            <ModalBody className="p-4">
              <div className="flex flex-col items-center gap-4">
                <div className="flex justify-between w-full bg-gradient-to-r from-black to-green-700 rounded-medium px-3 py-2">
                  <div className="text-left font-bold uppercase text-sm">
                    <h3>Verify Your Account</h3>
                    <p className="mt-1">
                      Get Your
                      <span className="text-btnPrimary"> 150% Extra </span>
                      <br />
                      <span className="text-btnPrimary">Welcome Bonus!</span>
                    </p>
                  </div>
                  <Image
                    removeWrapper
                    alt="animal"
                    className="w-[100px] h-[100px] object-cover -mt-6 -mb-2 -mr-6 xs:-mr-2"
                    src={animal1.src}
                  />
                </div>

                <div className="flex gap-2 items-center mr-auto">
                  <div className="relative">
                    <div className="w-16 h-16 bg-content1 rounded-lg flex items-center justify-center">
                      <Icon className="text-4xl" icon="lucide:mail" />
                    </div>
                  </div>

                  <div className="text-left">
                    <p className="text-default-700 text-sm mb-1">
                      We&apos;ve sent a confirmation email to
                    </p>
                    <p className="font-semibold text-sm">{email}</p>
                  </div>
                </div>

                <Divider />

                <div className="text-center text-sm">
                  <p className="text-default-700 ">
                    Not in inbox or spam folder?{" "}
                    {isCountingDown ? (
                      <span className="text-platinum">
                        Resend in {formatTime(countdown)}
                      </span>
                    ) : (
                      <Link
                        className="text-btnPrimary"
                        color="primary"
                        onPress={handleResend}
                      >
                        Resend
                      </Link>
                    )}
                  </p>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
