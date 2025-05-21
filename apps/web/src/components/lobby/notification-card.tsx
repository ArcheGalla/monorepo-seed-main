import React from "react";
import { Icon } from "@iconify/react";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { cn } from "@heroui/theme";

interface NotificationCardProps {
  type: string;
  title: string;
  message: React.JSX.Element;
  date: string;
  time: string;
  isRead: boolean;
  handleNotificationCardClick?: () => void;
}

export function NotificationCard({
  type,
  title,
  message,
  date,
  time,
  isRead,
  handleNotificationCardClick,
}: NotificationCardProps) {
  return (
    <Card
      isPressable
      className={cn("bg-content2", {
        "bg-content2/70": isRead,
      })}
      onPress={handleNotificationCardClick}
    >
      <CardBody className="gap-2 flex-row overflow-visible">
        {!isRead && (
          <div className="absolute top-0 right-0 h-3.5 w-3.5 bg-black rounded-full flex items-center justify-center">
            <div className="bg-btnPrimary h-2 w-2 rounded-full" />
          </div>
        )}
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-col gap-2 items-center p-2 bg-black rounded-small">
            {type === "promotion" ? (
              <svg
                aria-hidden="true"
                className=" text-secondary"
                height="30"
                role="img"
                viewBox="0 0 24 24"
                width="30"
              >
                <defs>
                  <linearGradient
                    id="myGradient"
                    x1="0%"
                    x2="100%"
                    y1="0%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <g
                  fill="none"
                  stroke="url(#myGradient)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <rect height="4" rx="1" width="18" x="3" y="8" />
                  <path d="M12 8v13m7-9v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7m2.5-4a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5a2.5 2.5 0 0 1 0 5" />
                </g>
              </svg>
            ) : (
              <Icon
                className={cn("text-btnPrimary ", {})}
                icon="lucide:percent"
                width={30}
              />
            )}
          </div>
          <div className="text-[10px] text-center text-default-400 font-medium">
            <time>{date}</time>
            <br />
            <time>{time}</time>
          </div>
        </div>
        <div className="">
          <Chip className="text-xs rounded-small" color={"danger"} size="sm">
            {type.toUpperCase()}
          </Chip>
          <h5 className="text-sm font-semibold my-1">{title}</h5>
          <div className="text-xs text-default-500">{message}</div>
        </div>
      </CardBody>
    </Card>
  );
}
