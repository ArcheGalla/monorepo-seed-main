import React from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";

import { Logo } from "@/components/atoms/logo";

export const LegalPagesHeader: React.FC = () => {
  return (
    <header className="w-full bg-black border-b border-divider shadow-md py-3 px-4">
      <div className="flex justify-between items-center mx-auto pl-2 pr-6 max-w-screen-2xl sm:px-10">
        <Logo imageClassName="object-cover w-[90px] h-[45px] rounded-none" />

        <div className="flex items-center gap-3">
          <Button
            as={Link}
            className="text-btnPrimary hidden sm:flex bg-btnPrimary/10"
            color="primary"
            href="/lobby"
            radius="full"
            startContent={<Icon icon="lucide:home" />}
            variant="flat"
          >
            Back to Lobby
          </Button>

          <Button
            as={Link}
            className="bg-btnPrimary"
            color="primary"
            href="/#"
            radius="full"
            startContent={<Icon icon="lucide:message-square" />}
            variant="solid"
          >
            Live Support
          </Button>
        </div>
      </div>
    </header>
  );
};
