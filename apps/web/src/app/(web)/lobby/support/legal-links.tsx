import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { Icon } from "@iconify/react";

interface LegalLinkProps {
  icon: string;
  title: string;
  href: string;
}

const LegalLinkItem: React.FC<LegalLinkProps> = ({ icon, title, href }) => {
  return (
    <Link
      className="flex items-center gap-3 p-4 rounded-xl bg-plumDark hover:opacity-80 transition-all"
      href={href}
    >
      <div className="bg-plum/80 p-2 rounded-lg shadow-sm">
        <Icon className="text-2xl text-primary" icon={icon} />
      </div>
      <span className="font-medium text-yellow-400">{title}</span>
      <Icon className="ml-auto text-default-500" icon="lucide:chevron-right" />
    </Link>
  );
};

export const LegalLinks: React.FC = () => {
  const links = [
    {
      icon: "lucide:help-circle",
      title: "Help Center",
      href: "/help-center",
    },
    {
      icon: "lucide:file-text",
      title: "Terms & Conditions",
      href: "/terms",
    },
    {
      icon: "lucide:award",
      title: "Sweepstakes Rules",
      href: "/sweepstakes-rules",
    },
    {
      icon: "lucide:shield",
      title: "Privacy Policy",
      href: "/privacy",
    },
    {
      icon: "lucide:info",
      title: "Responsible Gaming",
      href: "/responsible-gaming",
    },
  ];

  return (
    <Card className="shadow-md bg-plum h-full border border-magenta/20">
      <CardHeader>
        <h2 className="text-2xl font-semibold bg-gradient-to-b from-[#FFE783] to-[#E78D00] bg-clip-text text-transparent">
          Helpful Links
        </h2>
      </CardHeader>
      <CardBody className="space-y-3 flex-grow">
        {links.map((link) => (
          <LegalLinkItem
            key={link.href}
            href={link.href}
            icon={link.icon}
            title={link.title}
          />
        ))}
      </CardBody>
    </Card>
  );
};
