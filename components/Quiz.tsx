import { StyleSheet, SafeAreaView, ScrollView } from "react-native";

import { View } from "@/components/Themed";
import { Question } from "@/components/Question";
import { useEffect, useState } from "react";
import { Text, Button, ProgressBar, useTheme } from "react-native-paper";
import { QuestionWithCorrectAnswer } from "@/utils/fetchQuestions";
import { getCorrectAnswers } from "@/utils/getCorrectAnswers";
import { TEST_THRESHOLD } from "@/constants/Other";

export function Quiz({
  questions,
  displayAnswers: displayAnswersProp,
  enableSubmit = true,
  handleTimeUp,
  quizState,
}: {
  questions: QuestionWithCorrectAnswer[];
  displayAnswers?: boolean;
  enableSubmit?: boolean;
  handleTimeUp?: () => void;
  quizState?: "running" | "finished";
}) {
  const theme = useTheme();
  const [displayAnswers, setDisplayAnswers] = useState(displayAnswersProp);
  const [selectedQuestions, setSelectedQuestions] = useState<
    Map<number, string>
  >(new Map());

  const correctAnswers = getCorrectAnswers(questions, selectedQuestions);
  const passedQuizThreshold = correctAnswers.length / 10 >= TEST_THRESHOLD;
  const progress = selectedQuestions.size / 10;

  useEffect(() => {
    if (quizState === "finished") {
      setDisplayAnswers(true);
    } else if (quizState === "running") {
      setDisplayAnswers(false);
      setSelectedQuestions(new Map());
    }
  }, [quizState]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {enableSubmit ? (
        <ProgressBar progress={progress > 1 ? 1 : progress} />
      ) : null}
      <ScrollView>
        <View style={styles.container}>
          {questions.map((question, index) => (
            <Question
              key={question.questionNumberFromOriginalDocument}
              question={question}
              questionIndex={enableSubmit ? index + 1 : undefined}
              mode={displayAnswers ? "view" : "quiz"}
              correctAnswer={question.correctAnswer}
              displayAnswers={displayAnswers}
              onOptionSelect={(option) =>
                setSelectedQuestions((prev) =>
                  new Map(prev).set(
                    question.questionNumberFromOriginalDocument,
                    option
                  )
                )
              }
            />
          ))}
        </View>
      </ScrollView>
      {enableSubmit ? (
        !displayAnswers ? (
          <Button
            disabled={progress < 1}
            mode="contained"
            onPress={() => {
              setDisplayAnswers(true);
              handleTimeUp?.();
            }}
            style={styles.finishButton}
          >
            Տեսնել արդյունքները
          </Button>
        ) : (
          <Text
            style={[
              styles.finishText,
              {
                color: passedQuizThreshold ? "green" : theme.colors.error,
              },
            ]}
          >
            {correctAnswers.length} / 10
          </Text>
        )
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    gap: 8,
    padding: 16,
  },
  finishButton: {
    margin: 16,
  },
  finishText: {
    fontSize: 20,
    margin: 16,
    textAlign: "center",
  },
});
