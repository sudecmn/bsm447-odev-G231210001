import { View, Text, StyleSheet } from 'react-native';

export default function RateDetailScreen({ route }) {
  const { code } = route.params;

  return (
    <View style={styles.container}>
      <Text>Seçilen para birimi: {code}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});