"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Form } from "@heroui/form";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Link } from "@heroui/link";
import { Image } from "@heroui/image";
import { isMobile } from "react-device-detect";

import { errorNotification } from "../shared/notifications/error-notification";
import { successNotification } from "../shared/notifications/success-notification";

import { ExitConfirmationModal } from "./exit-confirmation-modal";
import { EmailConfirmationResendModal } from "./email-confirmation-resend-modal";

import { createClient } from "@/utils/supabase/client";
import { SIGN_UP_PROVIDERS } from "@/constants/sign-up-providers";
import { EmailVerificationModal } from "@/modules/auth/email-verification-modal";

// import animal1 from "@/assets/VB_Web_Frog1.webp";
import animal1 from "@/assets/VB_Web_Frog2.webp";
interface AuthModalProps {
  type: "login" | "signup" | null;
  setType: Dispatch<SetStateAction<"login" | "signup" | null>>;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const AuthModal: FC<AuthModalProps> = (props) => {
  const { type, setType, isOpen, onOpenChange } = props;

  const router = useRouter();

  const supabase = createClient();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const confirmationEmailDisclosure = useDisclosure();
  const emailConfirmationResendDisclosure = useDisclosure();
  const exitConfirmationModal = useDisclosure();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const switchType = () => {
    setType((prev) => (prev === "login" ? "signup" : "login"));
    setCredentials({ email: "", password: "" });
  };

  // Handle close attempt
  const handleCloseAttempt = () => {
    if (type === "signup") {
      exitConfirmationModal.onOpen();

      return;
    }

    onOpenChange(false);
  };

  // Handle confirmation to close
  const handleExitModalLogin = () => {
    exitConfirmationModal.onClose();
    setType("login");
    onOpenChange(true);
  };

  const handleExitModalSignUp = () => {
    exitConfirmationModal.onClose();
    setType("signup");
    onOpenChange(true);
  };

  const handleBackToSignUp = () => {
    confirmationEmailDisclosure.onClose();
    onOpenChange(true);
    setType("signup");
  };

  const handleSocialSignUp = (provider: SIGN_UP_PROVIDERS) => {
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    setIsLoading(false);

    if (error) {
      if (error.code === "email_not_confirmed") {
        errorNotification({
          title: (
            <span className="font-bold">Account Verification Required</span>
          ),
          description: (
            <p>
              Your account is pending email verification. Please check your
              email and follow the verification link to activate your account.
              If you haven’t received the verification email, you can
              <Button
                disableAnimation
                disableRipple
                className="text-btnPrimary data-[hover=true]:bg-transparent h-5 px-0 min-w-0 underline"
                variant="light"
                onPress={() => emailConfirmationResendDisclosure.onOpen()}
              >
                request a new one.
              </Button>
            </p>
          ),
        });
      } else {
        errorNotification({
          description: error.message || "Invalid email or password",
        });
      }
    } else {
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      successNotification({
        description: "Logged in successfully",
      });
      onOpenChange(false);
      router.push("/lobby");
    }
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    setIsLoading(false);

    if (error) {
      errorNotification({
        description: error.message || "Failed to create account",
      });
    } else {
      successNotification({
        description: "Account created successfully",
      });

      setConfirmationEmail(credentials.email);
      onOpenChange(false);
      confirmationEmailDisclosure.onOpen();
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    if (type === "login") {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setCredentials({ email: "", password: "" });
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        className="sm:max-w-[24rem]"
        classNames={{
          body: "py-3",
          backdrop: "bg-overlay/80",
          closeButton: "h-10 w-10 flex items-center justify-center",
          wrapper: "items-start h-auto",
          base: "my-auto",
        }}
        isOpen={isOpen}
        placement="center"
        shouldBlockScroll={!isMobile}
        size={isMobile ? "full" : "md"}
        onClose={handleCloseAttempt}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 items-center justify-center pt-7">
            <h2 className="text-2xl font-bold text-center  relative">
              {type === "login" ? "Log In" : "Create Account"}
            </h2>
          </ModalHeader>

          <ModalBody className="pt-5 p-4">
            {type === "signup" && (
              <div
                className="flex justify-between w-full bg-gradient-to-r from-black to-green-700 rounded-medium px-3 py-2 mb-2"
                // className="flex justify-between w-full bg-gradient-to-r from-black to-blue-600 rounded-medium px-3 py-2 mb-2"
              >
                <div className="text-left font-bold uppercase text-sm">
                  <h3>
                    <span className="text-btnPrimary">New Game Releases</span>
                    <br />
                    <span>Every Week</span>
                  </h3>
                  <p className="mt-1">
                    Find Your Next{" "}
                    <span className="text-btnPrimary">Big Win</span> Slot!
                  </p>
                </div>
                <Image
                  removeWrapper
                  alt="animal"
                  className="w-[100px] h-[100px] object-cover -mt-6 -mb-2 -mr-2"
                  src={animal1.src}
                />
              </div>
            )}

            <div className="flex flex-col gap-4">
              <Button
                className="bg-transparent border border-white text-white font-normal text-base"
                radius="sm"
                size="lg"
                startContent={<Icon icon="logos:google-icon" />}
                onPress={() => handleSocialSignUp(SIGN_UP_PROVIDERS.GOOGLE)}
              >
                {type === "login" ? "Log In" : "Sign Up"} with Google
              </Button>

              <Button
                isDisabled
                className="bg-transparent border border-white text-white font-normal text-base"
                radius="sm"
                size="lg"
                startContent={<Icon icon="logos:facebook" />}
                onPress={() => handleSocialSignUp(SIGN_UP_PROVIDERS.FACEBOOK)}
              >
                {type === "login" ? "Log In" : "Sign Up"} with Facebook
              </Button>

              <div className="flex items-center">
                <div className="flex-grow h-px bg-divider/5" />
                <span className="px-3 text-platinum text-sm">OR</span>
                <div className="flex-grow h-px bg-divider/5" />
              </div>

              <Form onSubmit={onSubmit}>
                <Input
                  label="Email"
                  radius="sm"
                  size="md"
                  type="email"
                  value={credentials.email}
                  onValueChange={(value) =>
                    setCredentials({ ...credentials, email: value })
                  }
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
                  value={credentials.password}
                  variant="flat"
                  onValueChange={(value) =>
                    setCredentials({ ...credentials, password: value })
                  }
                />

                <Button
                  className="w-full font-normal text-base bg-btnPrimary text-white"
                  color="secondary"
                  isDisabled={!credentials.email || !credentials.password}
                  isLoading={isLoading}
                  radius="sm"
                  size="lg"
                  type="submit"
                  variant="solid"
                >
                  {type === "login" ? "Log In" : "Create Account"}
                </Button>
              </Form>

              {type === "login" && (
                <div className="text-center text-sm">
                  <span className="text-platinum">Forgot your password?</span>
                  <Link
                    className="text-btnPrimary data-[hover=true]:bg-transparent h-5 px-2 min-w-0"
                    href="/reset-password"
                    size="sm"
                  >
                    Reset Password
                  </Link>
                </div>
              )}

              <div className="text-center text-sm">
                <span className="text-platinum">
                  {type === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                </span>
                <Button
                  disableAnimation
                  disableRipple
                  className="text-btnPrimary data-[hover=true]:bg-transparent h-5 px-1 min-w-0"
                  variant="light"
                  onPress={switchType}
                >
                  {type === "login" ? "Sign up" : "Log in"}
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <EmailVerificationModal
        backToSignUp={handleBackToSignUp}
        email={confirmationEmail}
        isOpen={confirmationEmailDisclosure.isOpen}
        onOpenChange={confirmationEmailDisclosure.onOpenChange}
      />

      <ExitConfirmationModal
        handleLogin={handleExitModalLogin}
        handleSignUp={handleExitModalSignUp}
        isOpen={exitConfirmationModal.isOpen}
        onOpenChange={exitConfirmationModal.onOpenChange}
      />

      <EmailConfirmationResendModal
        isOpen={emailConfirmationResendDisclosure.isOpen}
        onOpenChange={emailConfirmationResendDisclosure.onOpenChange}
      />
    </>
  );
};
