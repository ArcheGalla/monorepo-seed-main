"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";

interface HelpCategoryContentProps {
  category: {
    id: string;
    title: string;
    icon: string;
    topics: string[];
  };
}

export const HelpCategoryContent: React.FC<HelpCategoryContentProps> = ({
  category,
}) => {
  const getContent = (topic: string) => {
    // Map specific content based on the topic
    const contentMap: Record<string, React.ReactNode> = {
      "How to create an account": (
        <div className="py-2 text-default-600">
          <p className="mb-3">
            Creating an account at Vegas Bonanza is quick and easy. Follow these
            simple steps to get started:
          </p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>
              Download the Vegas Bonanza app from the App Store or Google Play.
            </li>
            <li>
              Open the app and tap on the &quot;Sign Up&quot; button on the
              welcome screen.
            </li>
            <li>Enter your email address or phone number.</li>
            <li>
              Create a secure password (at least 8 characters with a mix of
              letters, numbers, and symbols).
            </li>
            <li>
              Enter your date of birth to verify you meet the minimum age
              requirement.
            </li>
            <li>Accept the Terms of Service and Privacy Policy.</li>
            <li>Tap &quot;Create Account&quot; to complete registration.</li>
          </ol>
          <p className="mb-3 font-semibold">Important Notes:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>You must be at least 18 years old to create an account.</li>
            <li>
              You&apos;ll receive a verification email/SMS to confirm your
              account.
            </li>
            <li>
              Your account information is secured with industry-standard
              encryption.
            </li>
            <li>
              Vegas Bonanza is for entertainment purposes only - all games use
              virtual currency with no real money value.
            </li>
          </ul>
        </div>
      ),
      "Connecting via Facebook/Google/Apple": (
        <div className="py-2 text-default-600">
          <p className="mb-3">
            For quicker access to Vegas Bonanza, you can connect using your
            existing accounts:
          </p>
          <h3 className="font-semibold mb-2">Connect with Facebook</h3>
          <ol className="list-decimal pl-6 mb-4 space-y-1">
            <li>Tap &quot;Continue with Facebook&quot; on the login screen.</li>
            <li>A Facebook permission window will appear.</li>
            <li>
              Tap &quot;Continue&quot; to allow Vegas Bonanza to access your
              basic profile information.
            </li>
            <li>You&apos;ll be automatically logged in.</li>
          </ol>

          <h3 className="font-semibold mb-2">Connect with Google</h3>
          <ol className="list-decimal pl-6 mb-4 space-y-1">
            <li>Tap &quot;Continue with Google&quot; on the login screen.</li>
            <li>Select the Google account you wish to use.</li>
            <li>Review permissions and tap &quot;Continue&quot;.</li>
            <li>Your Vegas Bonanza account will be created or accessed.</li>
          </ol>

          <h3 className="font-semibold mb-2">
            Connect with Apple (iOS devices)
          </h3>
          <ol className="list-decimal pl-6 mb-4 space-y-1">
            <li>Tap &quot;Sign in with Apple&quot; on the login screen.</li>
            <li>
              Use Face ID, Touch ID, or your Apple password to authenticate.
            </li>
            <li>Choose whether to share or hide your email.</li>
            <li>Tap &quot;Continue&quot; to complete the connection.</li>
          </ol>

          <div className="mt-3 p-2 bg-plum rounded-md">
            <p className="text-sm">
              <span className="font-semibold">Privacy Note:</span> When
              connecting with social accounts, Vegas Bonanza only receives the
              information you explicitly allow. You can review these permissions
              in your social media account settings.
            </p>
          </div>
        </div>
      ),
      "Supported devices/platforms": (
        <div className="py-2 text-default-600">
          <p className="mb-3">
            Vegas Bonanza is available on multiple platforms to ensure you can
            enjoy our games wherever you are:
          </p>

          <h3 className="font-semibold mb-2">Mobile Devices</h3>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>
              <span className="font-medium">iOS:</span> iPhone and iPad running
              iOS 12.0 or later
            </li>
            <li>
              <span className="font-medium">Android:</span> Phones and tablets
              running Android 7.0 or later
            </li>
          </ul>

          <h3 className="font-semibold mb-2">System Requirements</h3>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>
              <span className="font-medium">iOS:</span> 2GB RAM minimum, 4GB
              recommended
            </li>
            <li>
              <span className="font-medium">Android:</span> 2GB RAM minimum, 4GB
              recommended
            </li>
            <li>Stable internet connection (WiFi or Mobile data)</li>
            <li>At least 500MB free storage space</li>
          </ul>

          <h3 className="font-semibold mb-2">Web Browser</h3>
          <p className="mb-2">
            Vegas Bonanza is also accessible via web browsers at
            www.vegasbonanza.com on:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Google Chrome (latest version)</li>
            <li>Safari (latest version)</li>
            <li>Firefox (latest version)</li>
            <li>Microsoft Edge (latest version)</li>
          </ul>

          <div className="mt-3 p-2 bg-plum rounded-md">
            <p className="text-sm">
              <span className="font-semibold">Note:</span> For the optimal
              gaming experience, we recommend using the latest version of our
              mobile app rather than the web version.
            </p>
          </div>
        </div>
      ),
      "Basic navigation of the app": (
        <div className="py-2 text-default-600">
          <p className="mb-3">
            Getting around the Vegas Bonanza app is simple and intuitive.
            Here&apos;s a quick guide to the main sections:
          </p>

          <h3 className="font-semibold mb-2">Main Lobby</h3>
          <p className="mb-2">The central hub where you can see:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Featured games and new releases</li>
            <li>Your current coin balance</li>
            <li>Daily bonuses and special offers</li>
            <li>Upcoming tournaments and events</li>
          </ul>

          <h3 className="font-semibold mb-2">
            Navigation Bar (Bottom of Screen)
          </h3>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>
              <span className="font-medium">Home:</span> Return to the main
              lobby from anywhere
            </li>
            <li>
              <span className="font-medium">Games:</span> Browse all available
              games by category
            </li>
            <li>
              <span className="font-medium">Rewards:</span> Check daily bonuses
              and loyalty rewards
            </li>
            <li>
              <span className="font-medium">Store:</span> Purchase coin packages
              and special offers
            </li>
            <li>
              <span className="font-medium">Profile:</span> Access your account
              settings and statistics
            </li>
          </ul>

          <h3 className="font-semibold mb-2">In-Game Navigation</h3>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>
              <span className="font-medium">Settings (gear icon):</span> Adjust
              sound, graphics, and game-specific options
            </li>
            <li>
              <span className="font-medium">Info (i icon):</span> View game
              rules and paytables
            </li>
            <li>
              <span className="font-medium">Back arrow:</span> Return to the
              lobby
            </li>
            <li>
              <span className="font-medium">Bet controls:</span> Adjust your
              wager amount
            </li>
            <li>
              <span className="font-medium">Auto-play:</span> Set the game to
              spin automatically
            </li>
          </ul>

          <div className="mt-3 p-2 bg-plum rounded-md">
            <p className="text-sm">
              <span className="font-semibold">Tip:</span> You can quickly access
              help and support from any screen by tapping your profile icon and
              selecting &quot;Help Center.&quot;
            </p>
          </div>
        </div>
      ),
    };

    // Return specific content if available, otherwise return the default content
    return (
      contentMap[topic] || (
        <div className="py-2 text-default-600">
          <p>
            {topic} information goes here. This is sample text for the{" "}
            {category.title.toLowerCase()} section. Detailed instructions and
            helpful tips would be provided here for the user.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Step-by-step guide</li>
            <li>Frequently asked questions</li>
            <li>Visual guides or screenshots</li>
            <li>Related information</li>
          </ul>
        </div>
      )
    );
  };

  // For the "Getting Started" category, display all content expanded
  if (category.id === "1") {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-full bg-plum p-3">
            <Icon
              className="text-primary"
              height={24}
              icon={category.icon}
              width={24}
            />
          </div>
          <h2 className="text-2xl font-semibold">{category.title}</h2>
        </div>

        <p className="text-default-600 mb-6">
          Everything you need to know about getting started with Vegas Bonanza.
          Find detailed information below.
        </p>

        <Divider className="my-4" />

        <div className="mt-4 space-y-8">
          {category.topics.map((topic, index) => (
            <div
              key={index}
              className="border border-default-200 rounded-lg overflow-hidden"
            >
              <div className="bg-default-50 p-4">
                <h3 className="font-semibold text-lg">{topic}</h3>
              </div>
              <div className="p-4">{getContent(topic)}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-lg bg-plum border border-plumDark">
          <div className="flex items-start">
            <div className="mr-3">
              <Icon
                className="text-primary"
                height={24}
                icon="lucide:lightbulb"
                width={24}
              />
            </div>
            <div>
              <h3 className="font-semibold text-primary">Helpful Tip</h3>
              <p className="text-sm text-default-600 mt-1">
                Still not finding what you need? Search for keywords or phrases
                in the search bar above, or contact our Live Support team for
                immediate assistance.
              </p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // For other categories, keep using the accordion
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-full bg-plum p-3">
          <Icon
            className="text-primary"
            height={24}
            icon={category.icon}
            width={24}
          />
        </div>
        <h2 className="text-2xl font-semibold">{category.title}</h2>
      </div>

      <p className="text-default-600 mb-6">
        Everything you need to know about {category.title.toLowerCase()}. Select
        a topic below.
      </p>

      <Divider className="my-4" />

      <Accordion className="mt-4" variant="bordered">
        {category.topics.map((topic, index) => (
          <AccordionItem
            key={index}
            aria-label={topic}
            subtitle={
              <div className="text-xs text-default-400">
                Click to expand and get detailed information
              </div>
            }
            title={<div className="font-medium">{topic}</div>}
          >
            {getContent(topic)}
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 p-4 rounded-lg bg-plum border border-plumDark">
        <div className="flex items-start">
          <div className="mr-3">
            <Icon
              className="text-primary"
              height={24}
              icon="lucide:lightbulb"
              width={24}
            />
          </div>
          <div>
            <h3 className="font-semibold text-primary">Helpful Tip</h3>
            <p className="text-sm text-default-600 mt-1">
              Still not finding what you need? Search for keywords or phrases in
              the search bar above, or contact our Live Support team for
              immediate assistance.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
