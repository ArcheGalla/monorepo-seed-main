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
import { Progress } from "@heroui/progress";

interface IDVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationComplete: () => void;
}

export const IDVerificationModal: React.FC<IDVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerificationComplete,
}) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    // Reset state when modal opens
    if (isOpen) {
      setSelectedFile(null);
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) return;

    setIsUploading(true);

    // Simulate upload process with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        // Complete after a short delay at 100%
        setTimeout(() => {
          setIsUploading(false);
          onVerificationComplete();
        }, 500);
      }
      setUploadProgress(progress);
    }, 400);
  };

  const idTypes = [
    { name: "Driver's License", icon: "lucide:id-card" },
    { name: "Passport", icon: "lucide:book-open" },
    { name: "National ID", icon: "lucide:credit-card" },
  ];

  return (
    <Modal
      backdrop="blur"
      isDismissable={!isUploading}
      isOpen={isOpen}
      size="md"
      onClose={isUploading ? undefined : onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Icon className="text-game-purple-400" icon="lucide:shield" />
            <span>Verify Your Identity</span>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="flex items-center justify-center bg-game-purple-500 bg-opacity-10 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-white">
                <Icon className="text-game-purple-300" icon="lucide:lock" />
                <span>Your information is secure and encrypted</span>
              </div>
            </div>

            <p className="text-sm text-gray-300">
              To complete your purchase and ensure your account&apos;s security,
              we need to verify your identity. Please upload a valid
              government-issued ID.
            </p>

            <div className="flex flex-wrap gap-2 justify-center">
              {idTypes.map((idType) => (
                <div
                  key={idType.name}
                  className="text-center p-3 bg-gray-800 bg-opacity-50 rounded-lg"
                >
                  <Icon
                    className="text-2xl mb-2 text-gray-300"
                    icon={idType.icon}
                  />
                  <p className="text-xs text-gray-300">{idType.name}</p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <input
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/jpg, application/pdf"
                className="hidden"
                disabled={isUploading}
                title="file"
                type="file"
                onChange={handleFileChange}
              />

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isUploading
                    ? "border-gray-600 bg-gray-800 bg-opacity-30"
                    : selectedFile
                      ? "border-game-purple-400 bg-game-purple-500 bg-opacity-5"
                      : "border-gray-600 hover:border-game-purple-400 hover:bg-gray-800 hover:bg-opacity-30"
                }`}
                onClick={isUploading ? undefined : handleUploadClick}
              >
                {isUploading ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center text-game-purple-400">
                      <Icon
                        className="text-2xl animate-spin"
                        icon="lucide:loader-2"
                      />
                    </div>
                    <p className="font-medium text-white">Uploading ID...</p>
                    <div className="w-full max-w-xs mx-auto">
                      <Progress
                        className="w-full"
                        color="secondary"
                        size="sm"
                        value={uploadProgress}
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        {uploadProgress}% complete
                      </p>
                    </div>
                  </div>
                ) : selectedFile ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center text-game-purple-400">
                      <Icon className="text-2xl" icon="lucide:check-circle" />
                    </div>
                    <p className="font-medium text-white">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Button
                      color="danger"
                      size="sm"
                      startContent={<Icon icon="lucide:x" />}
                      variant="flat"
                      onPress={() => setSelectedFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center text-gray-400">
                      <Icon className="text-3xl" icon="lucide:upload" />
                    </div>
                    <p className="font-medium text-white">Upload your ID</p>
                    <p className="text-xs text-gray-400">
                      Click to browse files or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      Accepted formats: JPG, PNG, PDF (max 10MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {!isUploading && (
              <div className="text-xs text-gray-400 mt-2">
                <p className="flex items-center gap-1">
                  <Icon className="text-xs" icon="lucide:shield-check" />
                  <span>
                    All uploaded documents are kept secure and confidential.
                  </span>
                </p>
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter className="border-t border-gray-800">
          <Button
            color="default"
            isDisabled={isUploading}
            variant="flat"
            onPress={onClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            isDisabled={!selectedFile || isUploading}
            isLoading={isUploading}
            onPress={handleSubmit}
          >
            {isUploading ? "Uploading..." : "Upload ID"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
