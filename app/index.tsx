import { View } from "@/components/Themed";
import { Stack, router } from "expo-router";
import { HomePageCard } from "@/components/HomePageCard";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <HomePageCard
        title="Ստուգել գիտելիքները"
        description="Ինչպես իրական քննությունը, այս թեստային հարցաշարը ևս պարունակում է 10 պատահական հարց հնարավոր 82 հարցերից։ Անցողիկ շեմը 80% է, այսինքն՝ թույլատրվում է միայն 2 սխալ պատասխան։"
        onPress={() => router.push(`/quiz`)}
      />
      <HomePageCard
        title="Դիտել հարցաշարը"
        description="Դիտել, ներբերնել և փնտրել պաշտոնական հարցաշարի բոլոր հարցերը և տեսնել հարցերի պատասխանները։"
        onPress={() => router.push(`/view-questions`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 16,
  },
});
