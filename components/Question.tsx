import { useSingleSelection } from "../hooks/useSingleSelection";
import { Question as QuestionType } from "@/utils/fetchQuestions";
import { Text, View } from "@/components/Themed";
import { Pressable, StyleSheet } from "react-native";
import { Option } from "./Option";

export const Question = ({
  question,
  mode = "quiz",
  questionIndex,
  onOptionSelect,
  displayAnswers,
  correctAnswer,
}: {
  question: QuestionType;
  mode?: "quiz" | "view";
  questionIndex?: number;
  onOptionSelect?: (option: string) => void;
  displayAnswers?: boolean;
  correctAnswer?: string;
}) => {
  const { selectedOption, setSelectedOption } = useSingleSelection();

  return (
    <View>
      <Text style={styles.question}>
        {questionIndex ?? question.questionNumberFromOriginalDocument}.{" "}
        {question.question}
      </Text>
      <View style={styles.optionContainer}>
        {question.options.map((option, index) => {
          const optionElement = (
            <Option
              key={`${index}-${option}`}
              isSelected={selectedOption === option}
              option={option}
              correctAnswer={correctAnswer}
              displayAnswers={displayAnswers}
            />
          );

          return mode === "quiz" ? (
            <Pressable
              key={`${index}-${option}`}
              onPress={() => {
                setSelectedOption(option);
                onOptionSelect?.(option);
              }}
            >
              {optionElement}
            </Pressable>
          ) : (
            optionElement
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  optionContainer: {
    gap: 4,
  },
});
