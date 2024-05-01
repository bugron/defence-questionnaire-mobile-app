import { Question, QuestionWithCorrectAnswer } from "./fetchQuestions";

const arrayRandomizer = <T extends unknown[]>(array: T) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const randomizeQuestions = (questions: Question[]) =>
  arrayRandomizer(questions).map<QuestionWithCorrectAnswer>((question) => ({
    ...question,
    correctAnswer: question.options[0],
    options: arrayRandomizer(question.options),
  }));
