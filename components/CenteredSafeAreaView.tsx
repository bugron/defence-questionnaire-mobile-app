import { FC, PropsWithChildren } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export const CenteredSafeAreaView: FC<PropsWithChildren> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
