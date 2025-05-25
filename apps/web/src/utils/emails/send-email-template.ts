import type {
  MergeVar,
  MessagesMessage,
  MessagesSendResponse,
} from "@mailchimp/mailchimp_transactional";

import mailchimpTransactional from "@mailchimp/mailchimp_transactional";
import dayjs from "dayjs";

const mailchimpClient = mailchimpTransactional(
  process.env.NEXT_MANDRILL_API_KEY || "",
);

interface IWelcomeToVegasBonanzaPayload {
  email: string;
  first_name?: string;
  faq?: string;
  support?: string;
}

interface IConfirmYourEmailPayload {
  email: string;
  login_url: string;
  firstName?: string;
}

interface IEmailTemplateParams {
  template_name: EmailTemplates;
  delay: number;
  payload: EventPayloadMap[EmailTemplates];
  subject?: string;
}

export enum EmailTemplates {
  WelcomeToVegasBonanza = "welcome-to-vegasbonanza",
  ConfirmYourEmail = "confirm-your-email",
}

export type EventPayloadMap = {
  [EmailTemplates.WelcomeToVegasBonanza]: IWelcomeToVegasBonanzaPayload;
  [EmailTemplates.ConfirmYourEmail]: IConfirmYourEmailPayload;
};

const getEmailTemplateVars = (
  payload: EventPayloadMap[EmailTemplates],
  template_name: EmailTemplates,
): MergeVar[] => {
  const vars: MergeVar[] = [];

  if ("login_url" in payload && payload.login_url) {
    vars.push({
      name: "login_url",
      content: payload.login_url,
    });
  }

  if ("first_name" in payload) {
    vars.push({
      name: "first_name",
      content: !!payload?.first_name ? payload?.first_name : "Player",
    });
  }

  if (template_name === EmailTemplates.WelcomeToVegasBonanza) {
    vars.push(
      {
        name: "faq_link",
        content: `${process.env.NEXT_PUBLIC_SITE_URL}/lobby/how-it-works`,
      },
      {
        name: "support_link",
        content: `${process.env.NEXT_PUBLIC_SITE_URL}/lobby/support`,
      },
      {
        name: "btn_link",
        content: `${process.env.NEXT_PUBLIC_SITE_URL}/lobby`,
      },
    );
  }

  return vars;
};

export async function sendEmailTemplate({
  template_name,
  delay,
  payload,
}: IEmailTemplateParams): Promise<MessagesSendResponse[] | undefined | null> {
  try {
    if (!payload.email) {
      throw new Error("[SEND_EMAIL_TEMPLATE] Email is required");
    }

    const send_at = delay
      ? dayjs().add(delay, "minutes").toISOString()
      : undefined;

    const vars = getEmailTemplateVars(payload, template_name);

    const message: MessagesMessage = {
      to: [
        {
          email: payload.email,
          type: "to",
        },
      ],
      merge_vars: [
        {
          rcpt: payload.email,
          vars,
        },
      ],
    };

    const response = await mailchimpClient.messages.sendTemplate({
      template_name,
      message,
      send_at,
      template_content: [],
    });

    return response as MessagesSendResponse[];
  } catch (error) {
    return null;
  }
}

export async function sendWelcomeToVegasBonanzaEmail(
  email: string,
  first_name?: string,
) {
  await sendEmailTemplate({
    template_name: EmailTemplates.WelcomeToVegasBonanza,
    delay: 0,
    payload: {
      email,
      first_name,
    },
  });
}
