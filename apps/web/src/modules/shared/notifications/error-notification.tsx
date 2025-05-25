import { ReactNode } from "react";

import { NOTIFICATION_TYPES, showNotification } from "./show-notification";

export const errorNotification = ({
  title,
  description,
}: {
  title?: ReactNode;
  description: ReactNode;
}) => {
  showNotification(NOTIFICATION_TYPES.ERROR, {
    title: title || NOTIFICATION_TYPES.ERROR.title,
    description: description,
  });
};
