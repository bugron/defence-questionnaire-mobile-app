import { Fragment, useContext } from "react";
import { randomizeQuestions } from "@/utils/questionRandomizer";
import { Quiz } from "@/components/Quiz";
import { DocumentContext } from "@/components/DocumentContext";
import { Stack } from "expo-router";

export default function QuizScreen() {
  const questions = useContext(DocumentContext)?.questions;

  if (!questions) {
    return null;
  }

  const randomQuestions = randomizeQuestions(questions).slice(0, 10);

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: "Ստուգել գիտելիքները",
        }}
      />
      <Quiz questions={randomQuestions} />
    </Fragment>
  );
}
