import { Text } from "@/components/Themed";
import { ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";

export const Option = ({
  option,
  isSelected = false,
  correctAnswer,
  displayAnswers = false,
}: {
  option: string;
  isSelected?: boolean;
  correctAnswer?: string;
  displayAnswers?: boolean;
}) => {
  const theme = useTheme();
  let borderColor: ViewStyle["borderColor"] = undefined;
  const isCorrectAnswer = option === correctAnswer;

  if (displayAnswers && isSelected && !isCorrectAnswer) {
    borderColor = theme.colors.error;
  } else if (displayAnswers && isCorrectAnswer) {
    borderColor = "green";
  }

  return (
    <Text
      style={{
        fontSize: 14,
        marginBottom: 8,
        padding: 8,
        borderRadius: 4,
        borderColor,
        borderWidth: displayAnswers && (isSelected || isCorrectAnswer) ? 1 : 0,
        backgroundColor: isSelected
          ? theme.colors.secondaryContainer
          : undefined,
      }}
    >
      {option}
    </Text>
  );
};
