import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToAccount: () => void;
  onContinueShopping: () => void;
}

export const CongratulationsModal: React.FC<CongratulationsModalProps> = ({
  isOpen,
  onClose,
  onGoToAccount,
  onContinueShopping,
}) => {
  return (
    <Modal backdrop="blur" isOpen={isOpen} size="md" onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Icon
              className="text-game-magenta-400 text-xl"
              icon="lucide:party-popper"
            />
            <span>Congratulations!</span>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-game-magenta-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <Icon
                  className="text-game-magenta-400 text-3xl"
                  icon="lucide:check"
                />
              </div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-lg font-semibold">
                Your purchase was successful!
              </p>
              <p className="text-sm text-black">
                You&apos;ve received your Gold Coins, and your entry into the
                sweepstakes has been confirmed.
              </p>
              <p className="text-sm text-black">
                Thank you for your purchase! Good luck in the sweepstakes, and
                enjoy your Gold Coins!
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="border-t border-gray-800 justify-center">
          <Button
            className="font-bold bg-yellow-500 text-black hover:bg-yellow-600"
            size="lg"
            startContent={<Icon icon="lucide:gamepad-2" />}
            onPress={onContinueShopping}
          >
            Play Now
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
