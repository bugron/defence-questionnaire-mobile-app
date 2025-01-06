import { View } from "@/components/Themed";
import { Stack, router } from "expo-router";
import { HomePageCard } from "@/components/HomePageCard";
import { StyleSheet } from "react-native";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.toggleSwitchContainer}>
          <ThemeSwitch />
        </View>
        <View style={styles.cardContainer}>
          <Stack.Screen options={{ headerShown: false }} />
          <HomePageCard
            title="Ստուգել գիտելիքները"
            description="Ինչպես իրական քննությունը, այս թեստային հարցաշարը ևս պարունակում է 10 պատահական հարց: Անցողիկ շեմը 80% է, այսինքն՝ թույլատրվում է միայն 2 սխալ պատասխան։ Տեսական քննության համար տրամադրվում է 30 րոպե ժամանակ։"
            onPress={() => router.push(`/quiz`)}
          />
          <HomePageCard
            title="Դիտել հարցաշարը"
            description="Դիտել, ներբերնել և փնտրել պաշտոնական հարցաշարի բոլոր հարցերը և տեսնել հարցերի պատասխանները։"
            onPress={() => router.push(`/view-questions`)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  toggleSwitchContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
