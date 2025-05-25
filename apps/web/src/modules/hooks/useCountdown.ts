import { useEffect, useState } from "react";

interface UseCountdownTimerProps {
  duration: number;
  isActive: boolean;
}

export const useCountdownTimer = ({
  duration,
  isActive,
}: UseCountdownTimerProps) => {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (isActive) {
      setCountdown(duration);
    }
  }, [isActive, duration]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isActive && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, isActive]);

  return {
    countdown,
    isCountingDown: isActive && countdown > 0,
    reset: () => setCountdown(duration),
  };
};
