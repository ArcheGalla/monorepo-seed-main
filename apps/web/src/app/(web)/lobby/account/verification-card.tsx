"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { useDisclosure } from "@heroui/modal";

import { KycVerificationPopup } from "./kyc-verification-popup";

type VerificationStatus = "verified" | "unverified" | "pending" | "rejected";

interface VerificationCardProps {
  title: string;
  status: VerificationStatus;
  icon: string;
  buttonText: string;
  buttonDisabled?: boolean;
}

export const VerificationCard: React.FC<VerificationCardProps> = ({
  title,
  status,
  icon,
  buttonText,
  buttonDisabled = false,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getStatusConfig = (status: VerificationStatus) => {
    switch (status) {
      case "verified":
        return {
          color: "success",
          icon: "lucide:check-circle",
          text: "Verified",
        };
      case "unverified":
        return {
          color: "default",
          icon: "lucide:alert-circle",
          text: "Unverified",
        };
      case "pending":
        return {
          color: "warning",
          icon: "lucide:clock",
          text: "Pending",
        };
      case "rejected":
        return {
          color: "danger",
          icon: "lucide:x-circle",
          text: "Rejected",
        };
      default:
        return {
          color: "default",
          icon: "lucide:help-circle",
          text: "Unknown",
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  const handleButtonClick = () => {
    if (title === "KYC Verification" && !buttonDisabled) {
      onOpen();
    }
  };

  return (
    <>
      <Card
        // className="border border-plum/50 bg-[#191428]"
        className="border border-plum/50 bg-plumDark"
        shadow="none"
      >
        <CardBody className="p-4 justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-plum/10 flex items-center justify-center">
              <Icon className="text-gold text-xl" icon={icon} />
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <div
                className={`flex items-center gap-1 text-${statusConfig.color} text-sm`}
              >
                <Icon className="text-sm" icon={statusConfig.icon} />
                <span>{statusConfig.text}</span>
              </div>
            </div>
          </div>
          <Button
            className={status !== "verified" ? "text-black font-medium" : ""}
            color={status === "verified" ? "success" : "warning"}
            radius="md"
            variant={status === "verified" ? "flat" : "solid"}
            fullWidth
            // isDisabled={buttonDisabled}
            onPress={handleButtonClick}
          >
            {buttonText}
          </Button>
        </CardBody>
      </Card>

      {title === "KYC Verification" && (
        <KycVerificationPopup isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
    </>
  );
};
