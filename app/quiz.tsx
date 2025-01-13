import { Fragment, useContext, useMemo, useReducer, useState } from "react";
import { StyleSheet } from "react-native";

import { randomizeQuestions } from "@/utils/questionRandomizer";
import { Quiz } from "@/components/Quiz";
import { DocumentContext } from "@/components/DocumentContext";
import { Text } from "@/components/Themed";
import { router, Stack } from "expo-router";
import { QuizTimer } from "@/components/QuizTimer";
import Feather from "@expo/vector-icons/Feather";
import { Button, IconButton } from "react-native-paper";

export default function QuizScreen() {
  const [quizState, setQuizState] = useState<"running" | "finished">("running");
  const questions = useContext(DocumentContext)?.questions;
  const [rerenderCount, updateRandomQuestions] = useReducer(
    (x: number) => x + 1,
    0
  );

  if (!questions) {
    return null;
  }

  const handleTimeUp = () => {
    setQuizState("finished");
  };

  const randomQuestions = useMemo(() => {
    return randomizeQuestions(questions).slice(0, 10);
  }, [questions, rerenderCount]);

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerTitleAlign: "left",
          headerLeft: (props) => {
            return (
              <IconButton
                icon={() => (
                  <Feather
                    name="arrow-left"
                    size={24}
                    color={props.tintColor}
                  />
                )}
                size={24}
                onPress={() => router.back()}
              />
            );
          },
          headerTitle: () =>
            quizState === "running" ? (
              <QuizTimer
                key={rerenderCount}
                timeInMinutes={30}
                onTimeUp={handleTimeUp}
                style={styles.quizTimer}
              />
            ) : (
              <Text>Ստուգել գիտելիքները</Text>
            ),
          headerRight(props) {
            return quizState === "finished" ? (
              <Button
                onPress={() => {
                  setQuizState("running");
                  updateRandomQuestions();
                }}
                accessibilityLabel="Սկսել նոր քննություն"
              >
                <Feather
                  aria-label="Սկսել նոր քննություն"
                  name="refresh-ccw"
                  backgroundColor="transparent"
                  color={props.tintColor}
                  size={20}
                />
              </Button>
            ) : null;
          },
        }}
      />
      <Quiz
        questions={randomQuestions}
        handleTimeUp={handleTimeUp}
        quizState={quizState}
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  quizTimer: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
