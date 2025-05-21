"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Icon } from "@iconify/react";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";

export const ContactForm: React.FC = () => {
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [selectedIssue, setSelectedIssue] = React.useState<string>("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const issueTypes = [
    "Login Issues",
    "Purchase Problems",
    "Game Not Loading",
    "Bonus Not Received",
    "Account Verification",
    "Technical Error",
    "Feedback / Suggestion",
    "Other",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation
    if (!subject || !selectedIssue || !message) {
      return;
    }

    // Submit form logic would go here
    console.log({ subject, selectedIssue, message });

    // Show confirmation
    setIsSubmitted(true);

    // Reset form
    setSubject("");
    setSelectedIssue("");
    setMessage("");

    // Hide confirmation after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <Card className="shadow-md bg-content1 h-full">
      <CardHeader className="flex flex-col gap-1 p-4 pb-0">
        <h2 className="text-base font-semibold mb-1">Need Assistance?</h2>
        <p className="text-default-600 text-sm">
          Fill out the form below and we&apos;ll get back to you
        </p>
      </CardHeader>
      <CardBody className="flex-grow p-4">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="bg-secondary/10 rounded-full p-4 mb-4">
              <Icon
                className="text-4xl text-secondary"
                icon="lucide:check-circle"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-content4">
              Thank You!
            </h3>
            <p className="text-default-600">
              Thanks! Our team will respond within 24–48 hours.
            </p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              isRequired
              classNames={{
                label: "text-default-600",
                input: "text-default-600",
              }}
              label="Subject"
              placeholder="Enter the subject of your inquiry"
              radius="lg"
              value={subject}
              variant="bordered"
              onValueChange={setSubject}
            />

            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="w-full justify-start"
                  endContent={<Icon icon="lucide:chevron-down" />}
                  radius="lg"
                  variant="bordered"
                >
                  {selectedIssue || "Select Issue Type"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Issue Types"
                className="w-full min-w-80"
                onAction={(key: string | number) =>
                  setSelectedIssue(String(key))
                }
              >
                {issueTypes.map((issue) => (
                  <DropdownItem key={issue}>{issue}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Textarea
              isRequired
              classNames={{
                label: "text-default-600",
                input: "text-default-600",
              }}
              label="Message"
              minRows={5}
              placeholder="Please describe your issue in detail"
              radius="lg"
              value={message}
              variant="bordered"
              onValueChange={setMessage}
            />

            <Button
              className="w-full bg-btnPrimary text-base"
              color="primary"
              radius="md"
              size="lg"
              type="submit"
            >
              Submit Request
            </Button>
          </form>
        )}
      </CardBody>
    </Card>
  );
};
