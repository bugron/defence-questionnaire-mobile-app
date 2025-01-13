import { StyleSheet, SafeAreaView } from "react-native";

import { Text, View } from "@/components/Themed";
import { useContext, useState } from "react";
import { Searchbar } from "react-native-paper";
import { Quiz } from "@/components/Quiz";
import { DocumentContext } from "@/components/DocumentContext";
import { QuestionWithCorrectAnswer } from "@/utils/fetchQuestions";
import { filterQuestions } from "@/utils/filterQuestions";
import { Stack } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import * as WebBrowser from "expo-web-browser";
import { IconButton } from "react-native-paper";
import { router } from "expo-router";

export default function ViewQuestionsScreen() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
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
                onPress={() => {
                  if (isSearchVisible) {
                    setIsSearchVisible(false);
                    setSearchQuery("");
                  } else {
                    router.back();
                  }
                }}
                style={{ marginRight: 8 }}
              />
            );
          },
          headerTitle: () => {
            if (isSearchVisible) {
              return (
                <Searchbar
                  showDivider={false}
                  placeholder="Փնտրել հարցաշարում"
                  value={searchQuery}
                  style={{
                    flex: 1,
                    marginRight: 32,
                    height: 40,
                  }}
                  inputStyle={{
                    top: -7,
                    height: 40,
                  }}
                  onChangeText={setSearchQuery}
                />
              );
            }

            return (
              <Text style={{ fontSize: 18 }}>
                Հարցաշար ({questionDocument.questions.length} հարց)
              </Text>
            );
          },
          headerRight(props) {
            return !isSearchVisible ? (
              <View
                style={{
                  margin: 0,
                  padding: 0,
                  gap: 0,
                  flexDirection: "row",
                  backgroundColor: "transparent",
                }}
              >
                <IconButton
                  icon={() => (
                    <Feather name="search" size={20} color={props.tintColor} />
                  )}
                  size={20}
                  onPress={() => setIsSearchVisible(true)}
                  style={{ margin: 0, marginRight: 8, padding: 0, gap: 0 }}
                />
                <IconButton
                  icon={() => (
                    <Feather
                      aria-label="Բացել հարցաշարի աղբյուրը"
                      name="external-link"
                      backgroundColor="transparent"
                      color={props.tintColor}
                      size={20}
                    />
                  )}
                  size={20}
                  style={{ margin: 0, padding: 0, gap: 0 }}
                  onPress={() =>
                    WebBrowser.openBrowserAsync(
                      questionDocument.originalDocumentURL
                    )
                  }
                />
              </View>
            ) : null;
          },
        }}
      />
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
