export interface Question {
  notes?: string;
  questionNumberFromOriginalDocument: number;
  question: string;
  optionType: "radio" | "checkbox";
  options: string[];
}

export interface QuestionWithCorrectAnswer extends Question {
  correctAnswer: string;
}

export interface QuestionDocument {
  originalDocumentURL: string;
  originalDocumentName: string;
  originalDocumentDate: string;
  questions: Question[];
}

export const fetchQuestions = async (): Promise<QuestionDocument> => {
  const response = await fetch(
    "https://raw.githubusercontent.com/bugron/defense-questionnaire-mobile-app/main/assets/questionnaires/latest.json"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  const questions = (await response.json()) as QuestionDocument;

  return questions;
};
