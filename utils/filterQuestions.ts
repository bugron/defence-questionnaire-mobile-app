import { QuestionWithCorrectAnswer } from "./fetchQuestions";

export const filterQuestions = (
  questions: QuestionWithCorrectAnswer[],
  searchQuery: string
) => {
  const lowerCaseSearchQuery = searchQuery.trim().toLocaleLowerCase();

  return lowerCaseSearchQuery.length
    ? questions.filter(
        ({ question, options, questionNumberFromOriginalDocument }) => {
          const lowerCaseSearchQuery = searchQuery.trim().toLocaleLowerCase();

          return `${questionNumberFromOriginalDocument}. ${question} ${options.join(
            " "
          )}`
            .toLowerCase()
            .includes(lowerCaseSearchQuery);
        }
      )
    : questions;
};
