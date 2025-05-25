import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [formData, setFormData] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);

  const handleChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });

    // Clear error when typing
    if (errors[key as keyof typeof errors]) {
      setErrors({
        ...errors,
        [key]: "",
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      valid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
      valid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
      valid = false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSubmit = () => {
    if (step === 1) {
      if (validateForm()) {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
          setIsLoading(false);
          setStep(2);
        }, 1500);
      }
    } else {
      onOpenChange(false);
      // Reset form for next time
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setStep(1);
    }
  };

  const passwordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 1;

    // Contains number
    if (/\d/.test(password)) strength += 1;

    // Contains special char
    if (/[!@#$%^&*]/.test(password)) strength += 1;

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;

    return strength;
  };

  const renderStrengthIndicator = () => {
    const strength = passwordStrength(formData.newPassword);

    return (
      <div className="mt-1">
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-1 flex-1 rounded-full ${
                strength >= level
                  ? level === 1
                    ? "bg-danger"
                    : level === 2
                      ? "bg-warning"
                      : level === 3
                        ? "bg-warning"
                        : "bg-success"
                  : "bg-default-200"
              }`}
            />
          ))}
        </div>
        <div className="text-xs mt-1 text-default-400">
          {strength === 0 && "Enter a password"}
          {strength === 1 && "Weak password"}
          {strength === 2 && "Fair password"}
          {strength === 3 && "Good password"}
          {strength === 4 && "Strong password"}
        </div>
      </div>
    );
  };

  return (
    <Modal
      backdrop="blur"
      classNames={{
        base: "bg-[#2A174F] text-white border border-plum/20",
      }}
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {step === 1 ? (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Icon className="text-warning text-xl" icon="lucide:key" />
                    <span>Change Password</span>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <p className="text-default-300 mb-4">
                    Keep your account secure by using a strong, unique password
                    that you don&apos;t use for other websites.
                  </p>

                  <div className="space-y-4">
                    <Input
                      classNames={{
                        label: "text-default-300",
                      }}
                      errorMessage={errors.currentPassword}
                      isInvalid={!!errors.currentPassword}
                      label="Current Password"
                      placeholder="Enter your current password"
                      radius="md"
                      type="password"
                      value={formData.currentPassword}
                      variant="bordered"
                      onValueChange={(value) =>
                        handleChange("currentPassword", value)
                      }
                    />

                    <Input
                      classNames={{
                        label: "text-default-300",
                      }}
                      description={renderStrengthIndicator()}
                      errorMessage={errors.newPassword}
                      isInvalid={!!errors.newPassword}
                      label="New Password"
                      placeholder="Enter your new password"
                      radius="md"
                      type="password"
                      value={formData.newPassword}
                      variant="bordered"
                      onValueChange={(value) =>
                        handleChange("newPassword", value)
                      }
                    />

                    <Input
                      classNames={{
                        label: "text-default-300",
                      }}
                      errorMessage={errors.confirmPassword}
                      isInvalid={!!errors.confirmPassword}
                      label="Confirm New Password"
                      placeholder="Confirm your new password"
                      radius="md"
                      type="password"
                      value={formData.confirmPassword}
                      variant="bordered"
                      onValueChange={(value) =>
                        handleChange("confirmPassword", value)
                      }
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    className="text-black"
                    color="warning"
                    isLoading={isLoading}
                    onPress={handleSubmit}
                  >
                    {!isLoading && <Icon className="mr-1" icon="lucide:save" />}
                    Update Password
                  </Button>
                </ModalFooter>
              </>
            ) : (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Icon
                      className="text-success text-xl"
                      icon="lucide:check-circle"
                    />
                    <span>Password Updated</span>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col items-center py-6">
                    <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-4">
                      <Icon
                        className="text-success text-4xl"
                        icon="lucide:shield-check"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Password Changed Successfully!
                    </h3>
                    <p className="text-default-300 text-center">
                      Your account is now secured with your new password.
                      Remember to keep it safe and never share it with anyone.
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="w-full text-black"
                    color="warning"
                    onPress={handleSubmit}
                  >
                    Done
                  </Button>
                </ModalFooter>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
