"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

interface KycVerificationPopupProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const KycVerificationPopup: React.FC<KycVerificationPopupProps> = ({
  isOpen,
  onOpenChange,
}) => {
  // Mock verification statuses
  const [emailStatus] = React.useState<"verified" | "unverified">("verified");
  const [phoneStatus] = React.useState<"verified" | "unverified">("verified");
  const [idStatus] = React.useState<
    "not-started" | "pending" | "verified" | "rejected"
  >("pending");

  // Phone verification state
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [isCodeSent, setIsCodeSent] = React.useState(false);

  const handleSendCode = () => {
    setIsCodeSent(true);
  };

  const handleVerifyCode = () => {
    // Mock verification logic
    console.log("Verifying code:", verificationCode);
  };

  const handleStartKyc = () => {
    // Navigate to KYC flow
    console.log("Starting KYC verification");
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Icon className="text-success text-xl" icon="lucide:check-circle" />
        );
      case "unverified":
        return (
          <Icon className="text-warning text-xl" icon="lucide:alert-circle" />
        );
      case "pending":
        return <Icon className="text-warning text-xl" icon="lucide:clock" />;
      case "rejected":
        return <Icon className="text-danger text-xl" icon="lucide:x-circle" />;
      default:
        return (
          <Icon className="text-default-400 text-xl" icon="lucide:circle" />
        );
    }
  };

  const getStepDescription = (step: string, status: string) => {
    if (step === "email") {
      return status === "verified"
        ? "Your email is verified."
        : "We've sent a verification link to your email.";
    } else if (step === "phone") {
      return status === "verified"
        ? "Your phone number is verified."
        : "Add and confirm your mobile number.";
    } else if (step === "id") {
      switch (status) {
        case "not-started":
          return "Submit a valid ID to verify your identity.";
        case "pending":
          return "We're currently reviewing your documents. This may take up to 24 hours.";
        case "verified":
          return "Your identity has been successfully verified.";
        case "rejected":
          return "We couldn't verify your ID. Please try again.";
        default:
          return "";
      }
    }

    return "";
  };

  return (
    <Modal
      backdrop="blur"
      classNames={{
        base: "bg-plumDark text-default-900 max-w-[540px]",
        header: "border-b border-default-200",
        footer: "border-t border-default-200",
      }}
      isOpen={isOpen}
      scrollBehavior="inside"
      size="lg"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-4">
              <h2 className="text-2xl font-bold bg-gradient-to-b from-[#FFE783] to-[#E78D00] bg-clip-text text-transparent">
                Verify Your Identity
              </h2>
              <p className="text-default-500 text-sm">
                Complete the steps below to unlock full access and benefits.
              </p>
            </ModalHeader>

            <ModalBody className="py-6">
              {/* Step 1: Email Verification */}
              <div className="flex gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      emailStatus === "verified"
                        ? "bg-success/10"
                        : "bg-warning/10"
                    }`}
                  >
                    {getStepIcon(emailStatus)}
                  </div>
                  <div className="w-0.5 h-full bg-default-200 my-2" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    Step 1: Email Verification
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        emailStatus === "verified"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {emailStatus === "verified" ? "Verified" : "Unverified"}
                    </span>
                  </h3>
                  <p className="text-default-600 mt-1">
                    {getStepDescription("email", emailStatus)}
                  </p>
                  {emailStatus !== "verified" && (
                    <Button
                      className="mt-2 text-black"
                      color="warning"
                      size="sm"
                      variant="flat"
                    >
                      Resend Email
                    </Button>
                  )}
                </div>
              </div>

              {/* Step 2: Phone Verification */}
              <div className="flex gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      phoneStatus === "verified"
                        ? "bg-success/10"
                        : "bg-warning/10"
                    }`}
                  >
                    {getStepIcon(phoneStatus)}
                  </div>
                  <div className="w-0.5 h-full bg-default-200 my-2" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    Step 2: Phone Verification
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        phoneStatus === "verified"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {phoneStatus === "verified" ? "Verified" : "Not Verified"}
                    </span>
                  </h3>
                  <p className="text-default-600 mt-1">
                    {getStepDescription("phone", phoneStatus)}
                  </p>
                  {phoneStatus !== "verified" && (
                    <div className="mt-3">
                      {!isCodeSent ? (
                        <div className="flex gap-2">
                          <Input
                            className="max-w-xs"
                            placeholder="+1 (555) 123-4567"
                            radius="md"
                            startContent={
                              <div className="flex items-center">
                                <span className="text-default-400 text-small">
                                  +1
                                </span>
                              </div>
                            }
                            value={phoneNumber}
                            variant="bordered"
                            onValueChange={setPhoneNumber}
                          />
                          <Button
                            className="text-black"
                            color="warning"
                            isDisabled={!phoneNumber}
                            onPress={handleSendCode}
                          >
                            Send Code
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm text-default-500">
                            Enter the 6-digit code sent to your phone
                          </p>
                          <div className="flex gap-2">
                            <Input
                              className="max-w-[150px]"
                              placeholder="123456"
                              radius="md"
                              value={verificationCode}
                              variant="bordered"
                              onValueChange={setVerificationCode}
                            />
                            <Button
                              className="text-black"
                              color="warning"
                              isDisabled={verificationCode.length !== 6}
                              onPress={handleVerifyCode}
                            >
                              Verify
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Step 3: Identity Verification */}
              <div className="flex gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      idStatus === "verified"
                        ? "bg-success/10"
                        : idStatus === "rejected"
                          ? "bg-danger/10"
                          : idStatus === "pending"
                            ? "bg-warning/10"
                            : "bg-default-100"
                    }`}
                  >
                    {getStepIcon(idStatus)}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    Step 3: Identity Verification (KYC)
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        idStatus === "verified"
                          ? "bg-success/10 text-success"
                          : idStatus === "rejected"
                            ? "bg-danger/10 text-danger"
                            : idStatus === "pending"
                              ? "bg-warning/10 text-warning"
                              : "bg-default-100 text-default-500"
                      }`}
                    >
                      {idStatus === "verified"
                        ? "Verified"
                        : idStatus === "rejected"
                          ? "Rejected"
                          : idStatus === "pending"
                            ? "Pending"
                            : "Not Started"}
                    </span>
                  </h3>
                  <p className="text-default-600 mt-1">
                    {getStepDescription("id", idStatus)}
                  </p>
                  {(idStatus === "not-started" || idStatus === "rejected") && (
                    <Button
                      className="mt-3 text-black"
                      color="warning"
                      onPress={handleStartKyc}
                    >
                      {idStatus === "rejected"
                        ? "Try Again"
                        : "Start Verification"}
                    </Button>
                  )}
                  {idStatus === "pending" && (
                    <div className="mt-3 bg-warning/10 p-3 rounded-md">
                      <div className="flex items-center gap-2">
                        <Icon className="text-warning" icon="lucide:clock" />
                        <p className="text-sm text-default-700">
                          Estimated completion time:{" "}
                          <span className="font-medium">24 hours</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Divider className="" />

              {/* Info Section */}
              <div
                // className="bg-[#191428] p-4 rounded-lg"
                className="bg-plum p-4 rounded-lg"
              >
                <h4 className="font-medium mb-2">Why do we need this?</h4>
                <p className="text-sm text-default-600">
                  We require identity verification to comply with sweepstakes
                  and legal regulations, protect your account, and ensure
                  responsible play. Your data is encrypted and handled securely.
                </p>
              </div>
            </ModalBody>

            <ModalFooter>
              <div className="w-full flex flex-col gap-2">
                <div className="flex justify-between">
                  <Button color="default" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    className="text-black"
                    color="warning"
                    onPress={onClose}
                  >
                    Continue Later
                  </Button>
                </div>
                <div className="text-center">
                  <Button
                    className="text-xs"
                    color="default"
                    size="sm"
                    variant="light"
                  >
                    <Icon className="text-xs mr-1" icon="lucide:help-circle" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
