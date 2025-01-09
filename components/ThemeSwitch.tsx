import { useColorScheme } from "@/hooks/useColorScheme";
import { IconButton } from "react-native-paper";
import { Appearance } from "react-native";
import { Feather } from "@expo/vector-icons";

export const ThemeSwitch = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <IconButton
      icon={() => (
        <Feather
          name={isDarkMode ? "moon" : "sun"}
          size={24}
          color={isDarkMode ? "white" : "black"}
        />
      )}
      size={24}
      onPress={() => Appearance.setColorScheme(isDarkMode ? "light" : "dark")}
    />
  );
};
