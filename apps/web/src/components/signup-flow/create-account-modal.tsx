import React, { FC, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Icon } from "@iconify/react";
import { Image } from "@heroui/image";

import { SIGN_UP_PROVIDERS } from "@/constants/sign-up-providers";
import { createClient } from "@/utils/supabase/client";
import animal1 from "@/assets/VB_Web_Frog1.webp";

interface CreateAccountModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAccountCreated: (email: string) => void;
}

export const CreateAccountModal: FC<CreateAccountModalProps> = ({
  isOpen,
  onOpenChange,
  onAccountCreated,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleCreateAccount = () => {
    if (email && password) {
      onAccountCreated(email);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSocialSignUp = (provider: SIGN_UP_PROVIDERS) => {
    const supabase = createClient();

    supabase.auth.signInWithOAuth({ provider });

    // onAccountCreated(`user@${provider.toLowerCase()}.com`);
  };

  return (
    <Modal
      hideCloseButton
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
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center justify-center pt-7">
              <h2 className="text-2xl font-bold text-center  relative">
                Create Account
              </h2>
            </ModalHeader>

            <ModalBody className="pt-5 p-4">
              <div className="w-full bg-gradient-to-r from black to bg-green-700 rounded-medium">
                <div className="max-w-[200px] text-left">
                  New Game Releases
                  <br />
                  Every Week
                  <p>Find Your Next Big Win Slot!</p>
                </div>
                <Image
                  removeWrapper
                  alt="animal"
                  className="w-[100px] h-[100px] object-cover"
                  src={animal1.src}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  className="bg-transparent border border-white text-white font-normal text-base"
                  radius="sm"
                  size="lg"
                  startContent={<Icon icon="logos:google-icon" />}
                  onPress={() => handleSocialSignUp(SIGN_UP_PROVIDERS.GOOGLE)}
                >
                  Sign Up with Google
                </Button>

                <Button
                  className="bg-transparent border border-white text-white font-normal text-base"
                  radius="sm"
                  size="lg"
                  startContent={<Icon icon="logos:facebook" />}
                  onPress={() => handleSocialSignUp(SIGN_UP_PROVIDERS.FACEBOOK)}
                >
                  Sign Up with Facebook
                </Button>

                <div className="flex items-center">
                  <div className="flex-grow h-px bg-divider/5" />
                  <span className="px-3 text-platinum text-sm">OR</span>
                  <div className="flex-grow h-px bg-divider/5" />
                </div>

                <Input
                  label="Email"
                  radius="sm"
                  size="md"
                  value={email}
                  onValueChange={setEmail}
                />

                <Input
                  endContent={
                    <button
                      className="focus:outline-none mb-3"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? (
                        <Icon className="text-default-400" icon="lucide:eye" />
                      ) : (
                        <Icon
                          className="text-default-400"
                          icon="lucide:eye-off"
                        />
                      )}
                    </button>
                  }
                  label="Password"
                  radius="sm"
                  size="md"
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  variant="flat"
                  onValueChange={setPassword}
                />

                <Button
                  className="w-full font-normal text-base bg-btnPrimary text-white"
                  color="secondary"
                  isDisabled={!email || !password}
                  radius="sm"
                  size="lg"
                  variant="solid"
                  onPress={handleCreateAccount}
                >
                  Create Account
                </Button>

                <div className="text-center text-sm">
                  <span className="text-platinum">
                    Already have an account?{" "}
                  </span>
                  <Link className="text-btnPrimary" color="primary" href="#">
                    Log in
                  </Link>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
