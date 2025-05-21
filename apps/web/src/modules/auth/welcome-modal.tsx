import React, { FC } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

interface WelcomeModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAccept: () => void;
}

export const WelcomeModal: FC<WelcomeModalProps> = ({
  isOpen,
  onOpenChange,
  onAccept,
}) => {
  return (
    <Modal
      className="sm:max-w-[24rem]"
      classNames={{
        body: "py-3",
        backdrop: "bg-overlay/80",
        closeButton: "h-10 w-10 flex items-center justify-center",
        header: "border-b border-divider",
      }}
      isOpen={isOpen}
      size="md"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center justify-center pt-7">
              <h2 className="text-2xl font-bold text-center relative">
                You Are Almost There
              </h2>
            </ModalHeader>
            <ModalBody className="p-4 gap-4">
              <div className="text-center text-sm">
                <p>To start playing, you need to accept our</p>
                <div className="flex justify-center gap-1">
                  <Link className="underline text-white text-sm" href="#">
                    Terms of Service
                  </Link>
                  <span>&</span>
                  <Link className="underline text-white text-sm" href="#">
                    Privacy Policy.
                  </Link>
                </div>
                <div className="mt-6 text-sm">
                  By using our site, you confirm you&apos;re 18+ and not a
                  resident of an excluded territory.
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="pt-2 flex justify-center">
              <Button
                className="w-full font-normal text-base bg-btnPrimary"
                color="secondary"
                radius="sm"
                size="lg"
                variant="solid"
                onPress={onAccept}
              >
                Accept
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
