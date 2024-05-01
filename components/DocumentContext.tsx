import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { Text, Button } from "react-native-paper";
import { StyleSheet } from "react-native";

import { QuestionDocument, fetchQuestions } from "@/utils/fetchQuestions";
import { useRequestState } from "@/hooks/useLoadingState";
import { CenteredSafeAreaView } from "@/components/CenteredSafeAreaView";
import { LoadingIndicator } from "@/components/LoadingIndicator";

export const DocumentContext = createContext<QuestionDocument | null>(null);

export const DocumentContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [requestState, setRequestState] = useRequestState();
  const [questionDocument, setQuestionDocument] =
    useState<QuestionDocument | null>(null);

  const loadQuestions = async () => {
    setRequestState("loading");

    try {
      const data = await fetchQuestions();

      setQuestionDocument(data);
      setRequestState("success");
    } catch {
      setRequestState("error");
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  if (requestState === "loading") {
    return (
      <CenteredSafeAreaView>
        <LoadingIndicator />
      </CenteredSafeAreaView>
    );
  }

  if (requestState === "error") {
    return (
      <CenteredSafeAreaView>
        <Text style={styles.loadFailureText}>Չստացվեց բեռնել հարցաշարը :(</Text>
        <Button mode="contained" onPress={loadQuestions}>
          Փորձել կրկին
        </Button>
      </CenteredSafeAreaView>
    );
  }

  return (
    <DocumentContext.Provider value={questionDocument}>
      {children}
    </DocumentContext.Provider>
  );
};

const styles = StyleSheet.create({
  loadFailureText: { marginBottom: 16, fontSize: 16 },
});
