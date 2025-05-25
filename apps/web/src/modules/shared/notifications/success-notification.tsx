import { ReactNode } from "react";

import { NOTIFICATION_TYPES, showNotification } from "./show-notification";

export const successNotification = ({
  title,
  description,
}: {
  title?: ReactNode;
  description: ReactNode;
}) => {
  showNotification(NOTIFICATION_TYPES.SUCCESS, {
    title: title || NOTIFICATION_TYPES.SUCCESS.title,
    description: description,
  });
};
