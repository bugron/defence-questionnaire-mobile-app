import { useState, useEffect, useRef, ComponentPropsWithoutRef } from "react";
import { Text } from "@/components/Themed";

interface QuizTimerProps extends ComponentPropsWithoutRef<typeof Text> {
  timeInMinutes: number;
  onTimeUp?: () => void;
}

export const QuizTimer = ({
  timeInMinutes,
  onTimeUp,
  ...props
}: QuizTimerProps) => {
  const [time, setTime] = useState(timeInMinutes * 60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return stopTimer;
  }, []);

  useEffect(() => {
    if (time === 0) {
      stopTimer();
      onTimeUp?.();
    }
  }, [time]);

  const formattedMinutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const formattedSeconds = (time % 60).toString().padStart(2, "0");

  return (
    <Text {...props}>
      {formattedMinutes}:{formattedSeconds}
    </Text>
  );
};
