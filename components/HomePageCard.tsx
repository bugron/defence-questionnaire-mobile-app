import { Card, Text } from "react-native-paper";

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
    <Card.Title title={title} titleVariant="titleLarge" />
    <Card.Content>
      <Text variant="bodyMedium">{description}</Text>
    </Card.Content>
  </Card>
);
