import { addToast } from "@heroui/toast";
import { ReactNode } from "react";

export const NOTIFICATION_TYPES = {
  SUCCESS: {
    title: "Success",
    color: "success",
  },
  ERROR: {
    title: "Error",
    color: "danger",
  },
} as const;

export const showNotification = (
  type: (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES],
  {
    title,
    description,
  }: {
    title?: ReactNode;
    description: ReactNode;
  },
) => {
  addToast({
    title: title || type.title,
    description: description,
    color: type.color,
  });
};
