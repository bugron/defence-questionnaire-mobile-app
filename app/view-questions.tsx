import { StyleSheet, SafeAreaView } from "react-native";

import { Text, View } from "@/components/Themed";
import { useContext, useState } from "react";
import { TextInput } from "react-native-paper";
import { Quiz } from "@/components/Quiz";
import { DocumentContext } from "@/components/DocumentContext";
import { QuestionWithCorrectAnswer } from "@/utils/fetchQuestions";
import { filterQuestions } from "@/utils/filterQuestions";
import { Stack } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import * as WebBrowser from "expo-web-browser";

export default function ViewQuestionsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const questionDocument = useContext(DocumentContext);
  const questions = questionDocument?.questions;

  if (!questions) {
    return null;
  }

  const questionsWithAnswers = questions.map<QuestionWithCorrectAnswer>(
    (question) => ({
      ...question,
      correctAnswer: question.options[0],
    })
  );
  const filteredQuestions = filterQuestions(questionsWithAnswers, searchQuery);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: `Հարցաշար (${questionDocument.questions.length} հարց)`,
          headerRight(props) {
            return (
              <Feather.Button
                aria-label="External Link"
                name="external-link"
                backgroundColor="transparent"
                color={props.tintColor}
                size={20}
                onPress={() =>
                  WebBrowser.openBrowserAsync(
                    questionDocument.originalDocumentURL
                  )
                }
              />
            );
          },
        }}
      />
      <View style={styles.searchInputContainer}>
        <TextInput
          mode="outlined"
          dense
          label="Փնտրել հարցաշարում"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {filteredQuestions.length > 0 ? (
        <Quiz
          questions={filteredQuestions}
          displayAnswers
          enableSubmit={false}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text>Արդյունք չի գտնվել :(</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInputContainer: {
    padding: 16,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
