import { QuestionWithCorrectAnswer } from "./fetchQuestions";

export const getCorrectAnswers = (
  questions: QuestionWithCorrectAnswer[],
  selectedQuestions: Map<number, string>
) => {
  return questions.filter(
    (question) =>
      question.correctAnswer ===
      selectedQuestions.get(question.questionNumberFromOriginalDocument)
  );
};
