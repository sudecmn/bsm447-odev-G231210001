import { View, Text, StyleSheet } from 'react-native';
import { getFlagEmoji } from '../utils/currency';

export default function RateDetailScreen({ route }) {
  const { code, rate, date } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.flag}>{getFlagEmoji(code)}</Text>
      <Text style={styles.title}>{code}</Text>
      <Text>1 EUR = {rate} {code}</Text>
      <Text>Kur tarihi: {date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  flag: { fontSize: 56 },
  title: { fontSize: 28, fontWeight: '700' },
});