"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Switch } from "@heroui/switch";
import { useDisclosure } from "@heroui/modal";
import { Divider } from "@heroui/divider";

import { ChangePasswordModal } from "./change-password-modal";

export const SecuritySection: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card
      // className="mb-8 bg-[#191428] border border-plum/50"
      className="mb-8 bg-content1"
      shadow="sm"
    >
      <CardBody className="p-6">
        {/* Password Section */}
        <div className="flex items-center justify-between mb-6 gap-1">
          <div>
            <h3 className="font-medium">Password</h3>
            <p className="text-default-500 text-sm">Last changed 30 days ago</p>
          </div>
          <Button
            className="text-black font-medium whitespace-normal h-auto min-h-10"
            color="warning"
            radius="md"
            variant="solid"
            onPress={onOpen}
          >
            Change Password
          </Button>
        </div>

        <ChangePasswordModal isOpen={isOpen} onOpenChange={onOpenChange} />

        <Divider className="my-4 bg-plum/50" />

        {/* 2FA Section */}
        <div className="flex items-center justify-between mb-6 gap-1">
          <div>
            <h3 className="font-medium text-white">
              Two-Factor Authentication
            </h3>
            <p className="text-default-500 text-sm">
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch
            color="secondary"
            isSelected={twoFactorEnabled}
            onValueChange={setTwoFactorEnabled}
          />
        </div>
      </CardBody>
    </Card>
  );
};
