"use client";

import type { ComponentProps } from "react";

import { ButtonProps } from "@heroui/button";
import { cn } from "@heroui/theme";
import { useControlledState } from "@react-stately/utils";
import { LazyMotion, domAnimation, m } from "framer-motion";
import React from "react";

export type HorizontalStepProps = {
  title?: string;
  className?: string;
};

export interface HorizontalStepsProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * An array of steps.
   *
   * @default []
   */
  steps?: HorizontalStepProps[];
  /**
   * The color of the steps.
   *
   * @default "primary"
   */
  color?: ButtonProps["color"];
  /**
   * The current step index.
   */
  currentStep?: number;
  /**
   * The default step index.
   *
   * @default 0
   */
  defaultStep?: number;
  /**
   * Whether to hide the progress bars.
   *
   * @default false
   */
  hideProgressBars?: boolean;
  /**
   * The custom class for the steps wrapper.
   */
  className?: string;
  /**
   * The custom class for the step.
   */
  stepClassName?: string;
  /**
   * Callback function when the step index changes.
   */
  onStepChange?: (stepIndex: number) => void;
  isImageLookupStep?: boolean;
}

function CheckIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <m.path
        animate={{ pathLength: 1 }}
        d="M5 13l4 4L19 7"
        initial={{ pathLength: 0 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={{
          delay: 0.2,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
      />
    </svg>
  );
}

const HorizontalSteps = React.forwardRef<
  HTMLButtonElement,
  HorizontalStepsProps
>(
  (
    {
      color = "primary",
      steps = [],
      defaultStep = 0,
      onStepChange,
      currentStep: currentStepProp,
      hideProgressBars = false,
      stepClassName,
      className,
      isImageLookupStep,
      ...props
    },
    ref,
  ) => {
    const [currentStep, setCurrentStep] = useControlledState(
      currentStepProp,
      defaultStep,
      onStepChange,
    );

    const colors = React.useMemo(() => {
      let userColor;
      let fgColor;

      const colorsVars = [
        "[--active-fg-color:hsl(var(--step-fg-color))]",
        "[--active-border-color:hsl(var(--step-color))]",
        "[--active-color:hsl(var(--step-color))]",
        "[--complete-background-color:hsl(var(--step-color))]",
        "[--complete-border-color:hsl(var(--step-color))]",
        "[--inactive-border-color:hsl(var(--nextui-default-300))]",
        "[--inactive-color:hsl(var(--nextui-default-300))]",
      ];

      switch (color) {
        case "primary":
          userColor = "[--step-color:var(--nextui-primary-500)]";
          fgColor = "[--step-fg-color:var(--nextui-primary-foreground)]";
          break;
        case "secondary":
          userColor = "[--step-color:var(--nextui-secondary)]";
          fgColor = "[--step-fg-color:var(--nextui-secondary-foreground)]";
          break;
        case "success":
          userColor = "[--step-color:var(--nextui-success)]";
          fgColor = "[--step-fg-color:var(--nextui-success-foreground)]";
          break;
        case "warning":
          userColor = "[--step-color:var(--nextui-warning)]";
          fgColor = "[--step-fg-color:var(--nextui-warning-foreground)]";
          break;
        case "danger":
          userColor = "[--step-color:var(--nextui-error)]";
          fgColor = "[--step-fg-color:var(--nextui-error-foreground)]";
          break;
        case "default":
          userColor = "[--step-color:var(--nextui-default)]";
          fgColor = "[--step-fg-color:var(--nextui-default-foreground)]";
          break;
        default:
          userColor = "[--step-color:var(--nextui-primary)]";
          fgColor = "[--step-fg-color:var(--nextui-primary-foreground)]";
          break;
      }

      colorsVars.unshift(fgColor);
      colorsVars.unshift(userColor);

      return colorsVars;
    }, [color]);

    return (
      <nav aria-label="Progress" className="w-full">
        <ol
          className={cn(
            "mb-2.5 flex flex-row flex-nowrap justify-between overflow-x-scroll",
            colors,
            className,
          )}
        >
          {steps?.map((step, stepIdx) => {
            const status =
              currentStep === stepIdx
                ? "active"
                : currentStep < stepIdx
                  ? "inactive"
                  : "complete";

            return (
              <li
                key={stepIdx}
                className={`relative flex items-start ${stepIdx < steps.length - 1 && "flex-1"} pb-8`}
              >
                <button
                  key={stepIdx}
                  ref={ref}
                  aria-current={status === "active" ? "step" : undefined}
                  className={cn(
                    "group flex w-full cursor-pointer flex-col items-center justify-center gap-y-2 rounded-large py-2.5",
                    stepClassName,
                  )}
                  onClick={() => setCurrentStep(stepIdx)}
                  {...props}
                >
                  <div className="h-ful relative flex w-full items-stretch">
                    <LazyMotion features={domAnimation}>
                      <m.div
                        animate={status}
                        className="relative flex flex-col items-center gap-y-2"
                      >
                        <m.div
                          className={cn(
                            "relative flex w-6 h-6 items-center justify-center rounded-full border-medium text-xs font-medium leading-tight text-green-500",
                            {
                              "shadow-lg": status === "complete",
                            },
                          )}
                          initial={false}
                          transition={{ duration: 0.25 }}
                          variants={{
                            inactive: {
                              backgroundColor: "transparent",
                              borderColor: "var(--inactive-border-color)",
                              color: "var(--inactive-color)",
                            },
                            active: {
                              backgroundColor: "transparent",
                              borderColor: "var(--active-border-color)",
                              color: "var(--active-color)",
                            },
                            complete: {
                              backgroundColor:
                                "var(--complete-background-color)",
                              borderColor: "var(--complete-border-color)",
                            },
                          }}
                        >
                          <div className="flex items-center justify-center">
                            {status === "complete" ? (
                              <CheckIcon className="h-5 w-5 text-[var(--active-fg-color)]" />
                            ) : (
                              <span>{stepIdx + 1}</span>
                            )}
                          </div>
                        </m.div>
                        <div
                          className={cn(
                            "absolute top-8 flex-1 text-center text-[10px] font-[300] leading-[1.15]",
                            {},
                          )}
                        >
                          <div
                            className={cn(
                              "regular-medium flex flex-col items-center text-default-foreground transition-[color,opacity] duration-300 group-active:opacity-80",
                              {
                                "text-default-500": status === "inactive",
                              },
                            )}
                          >
                            {step?.title
                              ?.split(" ")
                              ?.map((line, index) => (
                                <span key={index}>{line}</span>
                              ))}
                          </div>
                        </div>
                      </m.div>
                    </LazyMotion>
                    {stepIdx < steps.length - 1 && !hideProgressBars && (
                      <div className="h-full w-full min-w-5">
                        <div
                          aria-hidden="true"
                          className={cn(
                            "pointer-events-none mx-auto mt-[10px] flex w-[65%] -translate-y-1/2 items-center justify-center",
                          )}
                          style={{
                            // @ts-expect-error - Ignore type error
                            "--idx": stepIdx,
                          }}
                        >
                          <div
                            className={cn(
                              "relative h-0.5 w-full bg-default-200 transition-colors duration-300",
                              "after:absolute after:block after:h-full after:w-0 after:bg-[var(--active-border-color)] after:transition-[width] after:duration-300 after:content-['']",
                              {
                                "after:w-full": stepIdx < currentStep,
                              },
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

HorizontalSteps.displayName = "HorizontalSteps";

export default HorizontalSteps;
