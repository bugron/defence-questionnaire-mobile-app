import { useColorScheme } from "@/hooks/useColorScheme";
import { Switch } from "react-native-paper";
import { Appearance, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export const ThemeSwitch = () => {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Feather
        name="moon"
        size={24}
        color={colorScheme === "dark" ? "white" : "black"}
      />
      <Switch
        value={colorScheme === "dark"}
        onValueChange={(value) =>
          Appearance.setColorScheme(value ? "dark" : "light")
        }
      />
    </View>
  );
};
