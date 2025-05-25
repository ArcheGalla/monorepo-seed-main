import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import { Modal, ModalContent, ModalBody } from "@heroui/modal";
import React from "react";

import animal1 from "@/assets/VB_Web_Fox.webp";

interface ExitConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  handleLogin: () => void;
  handleSignUp: () => void;
}

export const ExitConfirmationModal = ({
  isOpen,
  onOpenChange,
  handleLogin,
  handleSignUp,
}: ExitConfirmationModalProps) => {
  return (
    <Modal
      className="overflow-visible sm:max-w-[24rem]"
      classNames={{
        body: "py-3",
        backdrop: "bg-overlay/80",
        closeButton: "h-10 w-10 flex items-center justify-center",
      }}
      isOpen={isOpen}
      size="md"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <ModalBody className="p-4">
            <div className="flex flex-col items-center gap-3">
              <Image
                removeWrapper
                alt="animal"
                className="w-[200px] h-[200px] object-cover -mt-14"
                src={animal1.src}
              />

              <div className="text-center">
                <h2 className="text-2xl font-bold">Are You Sure?</h2>
                <p className="text-lg font-medium">You Are Almost There!</p>
              </div>

              <div className="text-center bg-content2 w-full py-4 relative">
                {/* zigzag top */}
                <div className="absolute top-0 left-0 w-full h-2 bg-content1 [clip-path:polygon(0%_0%,2%_100%,4%_0%,6%_100%,8%_0%,10%_100%,12%_0%,14%_100%,16%_0%,18%_100%,20%_0%,22%_100%,24%_0%,26%_100%,28%_0%,30%_100%,32%_0%,34%_100%,36%_0%,38%_100%,40%_0%,42%_100%,44%_0%,46%_100%,48%_0%,50%_100%,52%_0%,54%_100%,56%_0%,58%_100%,60%_0%,62%_100%,64%_0%,66%_100%,68%_0%,70%_100%,72%_0%,74%_100%,76%_0%,78%_100%,80%_0%,82%_100%,84%_0%,86%_100%,88%_0%,90%_100%,92%_0%,94%_100%,96%_0%,98%_100%,100%_0%)]" />
                {/* zigzag bottom */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-content1 [clip-path:polygon(0%_100%,2%_0%,4%_100%,6%_0%,8%_100%,10%_0%,12%_100%,14%_0%,16%_100%,18%_0%,20%_100%,22%_0%,24%_100%,26%_0%,28%_100%,30%_0%,32%_100%,34%_0%,36%_100%,38%_0%,40%_100%,42%_0%,44%_100%,46%_0%,48%_100%,50%_0%,52%_100%,54%_0%,56%_100%,58%_0%,60%_100%,62%_0%,64%_100%,66%_0%,68%_100%,70%_0%,72%_100%,74%_0%,76%_100%,78%_0%,80%_100%,82%_0%,84%_100%,86%_0%,88%_100%,90%_0%,92%_100%,94%_0%,96%_100%,98%_0%,100%_100%)]" />

                <p>Register Now to Get</p>
                <p className="text-2xl font-bold text-[#4eff32]">150% EXTRA</p>
              </div>

              <div className="w-full space-y-3">
                <Button
                  className="w-full bg-btnPrimary text-white h-12 font-normal text-base"
                  radius="sm"
                  onPress={handleSignUp}
                >
                  Back To Registration
                </Button>

                <Button
                  className="w-full bg-transparent font-normal text-white py-3 underline text-base"
                  onPress={onOpenChange}
                >
                  Exit anyway
                </Button>
              </div>

              <Divider />

              <div className="text-center ">
                <p className="text-white text-base">
                  Already got an account?{" "}
                  <Link
                    as={Button}
                    className="text-white font-normal underline bg-transparent px-0 min-w-0"
                    onPress={handleLogin}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};
