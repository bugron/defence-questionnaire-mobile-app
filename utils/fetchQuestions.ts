import AsyncStorage from "@react-native-async-storage/async-storage";

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

const QUESTIONS_KEY = "questions";

export const fetchAndStoreQuestions = async (): Promise<QuestionDocument> => {
  const response = await fetch(
    "https://raw.githubusercontent.com/bugron/defense-questionnaire-mobile-app/main/assets/questionnaires/latest.json"
  );

  if (!response.ok) {
    const value = await AsyncStorage.getItem(QUESTIONS_KEY);

    if (value !== null) {
      return JSON.parse(value) as QuestionDocument;
    }

    throw new Error("Failed to fetch questions");
  }

  const questions = (await response.json()) as QuestionDocument;

  await AsyncStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));

  return questions;
};
