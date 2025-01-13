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

const fetchFromStorage = async () => {
  const value = await AsyncStorage.getItem(QUESTIONS_KEY);

  if (value) {
    return JSON.parse(value) as QuestionDocument;
  }

  throw new Error("Failed to fetch questions");
};

export const fetchAndStoreQuestions = async (): Promise<QuestionDocument> => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/bugron/defense-questionnaire-mobile-app/main/assets/questionnaires/latest.json"
    );

    if (!response.ok) {
      return fetchFromStorage();
    }

    const questions = (await response.json()) as QuestionDocument;

    await AsyncStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));

    return questions;
  } catch {
    return fetchFromStorage();
  }
};
