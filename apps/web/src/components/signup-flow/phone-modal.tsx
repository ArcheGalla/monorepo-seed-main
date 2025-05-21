"use client";

import { Input } from "@heroui/input";
import { Modal, ModalContent, ModalBody, ModalHeader } from "@heroui/modal";
import { Icon } from "@iconify/react";
import React, { FC, useState } from "react";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { InputOtp } from "@heroui/input-otp";
import { Image } from "@heroui/image";
import { isMobile } from "react-device-detect";

interface PhoneModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
}

export const PhoneModal: FC<PhoneModalProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
}) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [otpValue, setOtpValue] = React.useState<string>("");
  const [isResending, setIsResending] = React.useState<boolean>(false);
  const [countdown, setCountdown] = React.useState<number>(0);

  // Handle phone verification submission
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Move to OTP verification step
      setStep(2);
      startCountdown();
    }, 1500);
  };

  // Handle OTP verification submission
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Move to success step
      setStep(3);
    }, 1500);
  };

  // Start countdown for OTP resend
  const startCountdown = () => {
    setCountdown(30);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  // Handle OTP resend
  const handleResendOtp = () => {
    setIsResending(true);

    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      startCountdown();
    }, 1500);
  };

  return (
    <Modal
      hideCloseButton
      className="overflow-visible sm:max-w-[24rem]"
      classNames={{
        body: "p-4 gap-4",
        backdrop: "bg-overlay/80",
        closeButton: "h-10 w-10 flex items-center justify-center",
        header: "border-b border-divider",
        wrapper: "items-end h-auto",
        base: "my-auto",
      }}
      isDismissable={false}
      isOpen={isOpen}
      placement="center"
      shouldBlockScroll={!isMobile}
      size="md"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {step === 1 && (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center justify-center pt-7">
              <h2 className="text-2xl font-bold text-center  relative">
                Phone Verification
              </h2>
            </ModalHeader>

            <ModalBody>
              <Form
                className="flex flex-col gap-4"
                onSubmit={handlePhoneSubmit}
              >
                <div className="w-full">
                  <label
                    className="text-white uppercase text-sm font-medium mb-2 block"
                    htmlFor="phone-input"
                  >
                    PHONE NUMBER
                  </label>
                  <div className="flex w-full gap-1">
                    <div className="bg-content2 text-white h-12 rounded-l-small px-2 flex items-center justify-center min-w-[75px] gap-2 text-sm">
                      <Image
                        alt="US"
                        className="shrink-0 rounded-none"
                        height={24}
                        src={`https://flagcdn.com/us.svg`}
                        width={24}
                      />
                      <span>US</span>
                    </div>
                    <Input
                      classNames={{
                        inputWrapper:
                          "border-none rounded-r-small h-12 rounded-l-none",
                        input: "text-base",
                      }}
                      id="phone-input"
                      radius="sm"
                      size="md"
                      startContent="+1"
                      value={phoneNumber}
                      onValueChange={setPhoneNumber}
                    />
                  </div>
                </div>

                <Button
                  className="w-full font-normal text-base h-12 bg-btnPrimary text-white"
                  color="secondary"
                  isDisabled={!phoneNumber || phoneNumber.length < 10}
                  isLoading={isLoading}
                  radius="sm"
                  size="sm"
                  type="submit"
                  variant="solid"
                >
                  Accept
                </Button>
                <p className="text-sm text-default-600 text-center">
                  This phone number will be used for prize redemption
                  verification.
                </p>
              </Form>
            </ModalBody>
          </>
        )}

        {step === 2 && (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center justify-center pt-7">
              <Button
                isIconOnly
                className="absolute left-2"
                variant="light"
                onPress={() => setStep(1)}
              >
                <Icon icon="lucide:chevron-left" />
              </Button>
              <h2 className="text-2xl font-bold text-center  relative">
                Verify Your Phone
              </h2>
            </ModalHeader>

            <ModalBody>
              <Form
                className="flex flex-col items-center justify-center gap-4"
                onSubmit={handleOtpSubmit}
              >
                <p className="text-center text-sm text-default-600">
                  An SMS with a verification code was sent to your phone. Please
                  check your messages and enter the code below.
                </p>
                <div className="flex justify-center mx-auto">
                  <InputOtp
                    length={6}
                    value={otpValue}
                    onValueChange={setOtpValue}
                  />
                </div>

                <div className="flex justify-center mx-auto items-center">
                  {countdown > 0 ? (
                    <p className="text-default-500 text-sm">
                      Resend code in {countdown}s
                    </p>
                  ) : (
                    <Button
                      disableAnimation
                      disableRipple
                      className="text-btnPrimary data-[hover=true]:bg-transparent h-5 px-1 min-w-0 mx-auto"
                      isLoading={isResending}
                      variant="light"
                      onPress={handleResendOtp}
                    >
                      Resend Code
                    </Button>
                  )}
                </div>

                <Button
                  className="w-full font-normal text-base h-12 bg-btnPrimary text-white"
                  color="secondary"
                  isDisabled={otpValue.length !== 6}
                  isLoading={isLoading}
                  radius="sm"
                  size="sm"
                  type="submit"
                  variant="solid"
                >
                  Verify
                </Button>
              </Form>
            </ModalBody>
          </>
        )}

        {step === 3 && (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center justify-center pt-7">
              <h2 className="text-2xl font-bold text-center  relative">
                Awesome!
              </h2>
            </ModalHeader>

            <ModalBody>
              <p className="text-center">
                Your phone was verified successfully!
              </p>

              <Icon
                className="text-success mx-auto"
                height="140"
                icon="fluent:phone-checkmark-20-regular"
                width="140"
              />

              <Button
                className="w-full font-normal text-base h-12 bg-btnPrimary text-white"
                radius="sm"
                size="sm"
                variant="solid"
                onPress={onConfirm}
              >
                Close
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
