"use client";

import React, { ReactNode } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Icon } from "@iconify/react";

// @@ts-expect-error Fix nextui error - Expression produces a union type that is too complex to represent

const AccordionComponent: any = Accordion;

// @@ts-expect-error Fix nextui error - Expression produces a union type that is too complex to represent

const AccordionItemComponent: any = AccordionItem;

interface IFaqItems {
  questions: { question: string; answer: string | ReactNode }[];
}

export const FaqItemsRewards = ({ questions }: IFaqItems) => {
  const accordionProps: any = {
    fullWidth: true,
    keepContentMounted: true,
    className: "gap-3 px-0",
    itemClasses: {
      base: "px-6 !bg-content1 hover:!bg-default-200/50 sm:px-6",
      title: "font-medium text-base",
      trigger: "py-4",
      content: "pt-0 pb-6 text-base text-default-600 text-left",
    },
    selectionMode: "multiple",
    variant: "splitted",
  };

  return (
    <AccordionComponent {...(accordionProps as any)}>
      {questions.map(({ question, answer }, i) => (
        <AccordionItemComponent
          key={`faq-review: ${i}`}
          indicator={<Icon icon="lucide:plus" width={24} />}
          title={question}
        >
          {answer}
        </AccordionItemComponent>
      ))}
    </AccordionComponent>
  );
};
