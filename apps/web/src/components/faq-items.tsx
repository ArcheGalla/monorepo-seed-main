"use client";

import React from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";

// @@ts-expect-error Fix nextui error - Expression produces a union type that is too complex to represent

const AccordionComponent: any = Accordion;

// @@ts-expect-error Fix nextui error - Expression produces a union type that is too complex to represent

const AccordionItemComponent: any = AccordionItem;

interface IFaqItems {
  questions: { question: string; answer: string | React.ReactNode }[];
}

export const FaqItems = ({ questions }: IFaqItems) => {
  const accordionProps: any = {
    fullWidth: true,
    keepContentMounted: true,
    className: "gap-3 px-0",
    itemClasses: {
      base: "px-0 sm:px-6",
      title: "font-medium text-large",
      indicator: "rotate-180 data-[open=true]:rotate-[270deg]",
      trigger: "py-4 flex-row-reverse items-center justify-between",
      content: "pt-0 pb-6 text-base text-default-600 text-left",
    },
    selectionMode: "multiple",
  };

  return (
    <AccordionComponent {...(accordionProps as any)}>
      {questions.map(({ question, answer }, i) => (
        <AccordionItemComponent key={`faq-review: ${i}`} title={question}>
          {answer}
        </AccordionItemComponent>
      ))}
    </AccordionComponent>
  );
};
