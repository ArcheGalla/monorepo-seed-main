"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Icon } from "@iconify/react";
import React from "react";

import { HelpCategoryContent } from "./help-category-content";

const helpCategories = [
  {
    id: "1",
    title: "Getting Started",
    icon: "lucide:rocket",
    topics: [
      "How to create an account",
      "Connecting via Facebook/Google/Apple",
      "Supported devices/platforms",
      "Basic navigation of the app",
    ],
  },
  {
    id: "2",
    title: "Account & Profile",
    icon: "lucide:user",
    topics: [
      "How to change username or avatar",
      "Resetting your password",
      "Email/phone number management",
      "Account security & verification",
    ],
  },
  {
    id: "3",
    title: "Games & Features",
    icon: "lucide:gamepad-2",
    topics: [
      "How to play slot games",
      "Daily bonuses & spins",
      "Special events & tournaments",
      "Leveling up and VIP programs",
    ],
  },
  {
    id: "4",
    title: "Coins & Purchases",
    icon: "lucide:coins",
    topics: [
      "How to purchase coins",
      "What to do if coins don't arrive",
      "Free coins: how to earn them",
      "Purchase history & receipts",
    ],
  },
  {
    id: "5",
    title: "Technical Support",
    icon: "lucide:wrench",
    topics: [
      "App crashes or won't load",
      "Game freezing or lag",
      "Reinstalling without losing progress",
      "Reporting a bug",
    ],
  },
  {
    id: "6",
    title: "Responsible Gaming",
    icon: "lucide:shield",
    topics: [
      "Time limit & spending tools",
      "Game is for entertainment only",
      "How to request a cooldown or account deactivation",
    ],
  },
  {
    id: "7",
    title: "Contact Us",
    icon: "lucide:message-circle",
    topics: [
      "Live chat or email support",
      "How to send a bug report",
      "What info to include when reaching out",
    ],
  },
];

export const HelpCenterContent = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("1");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const handleSelectionChange = (key: React.Key) => {
    setSelectedCategory(key.toString());
  };

  const filteredCategories = helpCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.topics.some((topic) =>
        topic.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <div className="lg:container mx-auto px-6 py-8">
      <Card className="p-6 bg-content1 shadow-xl mb-6">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-b from-[#FFE783] to-[#E78D00] bg-clip-text text-transparent  mb-2">
            Help Center
          </h1>
          <p className="text-default-600 mb-6">
            Find answers to your questions about our Social Casino
          </p>
          <div className="w-full max-w-lg">
            <Input
              className="mb-2"
              placeholder="Search for help topics..."
              radius="lg"
              size="lg"
              startContent={
                <Icon className="text-default-400" icon="lucide:search" />
              }
              value={searchQuery}
              variant="bordered"
              onValueChange={setSearchQuery}
            />
          </div>
        </div>

        <Divider className="my-6" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <Accordion
              className="p-0"
              selectedKeys={[selectedCategory]}
              variant="splitted"
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0]?.toString() || "1";

                handleSelectionChange(selected);
              }}
            >
              {filteredCategories.map((category) => (
                <AccordionItem
                  key={category.id}
                  aria-label={category.title}
                  className="py-2"
                  title={
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <Icon height={20} icon={category.icon} width={20} />
                      </div>
                      <span>{category.title}</span>
                    </div>
                  }
                >
                  <div className="pl-10 text-sm text-default-500 space-y-2">
                    {category.topics.map((topic, index) => (
                      <div
                        key={index}
                        className="py-2 px-2 rounded-md hover:bg-primary/80 hover:text-white cursor-pointer transition-all"
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="lg:col-span-8">
            <HelpCategoryContent
              category={
                helpCategories.find((c) => c.id === selectedCategory) ||
                helpCategories[0]
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
