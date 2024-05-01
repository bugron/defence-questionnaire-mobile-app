import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export const HomePageCard = ({
  title,
  description,
  onPress,
}: {
  title: string;
  description: string;
  onPress: () => void;
}) => (
  <Card
    mode="elevated"
    onPress={onPress}
    style={{
      width: "100%",
    }}
  >
    <Card.Content>
      <Text variant="titleLarge" style={styles.cardTitle}>
        {title}
      </Text>
      <Text variant="bodyMedium">{description}</Text>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  cardTitle: {
    marginBottom: 8,
  },
});
