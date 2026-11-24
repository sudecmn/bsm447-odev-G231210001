import { Pressable, Text, StyleSheet } from 'react-native';
import { getFlagEmoji } from '../utils/currency';

export default function RateRow({ code, rate, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={onPress}
    >
      <Text style={styles.flag}>{getFlagEmoji(code)}</Text>
      <Text style={styles.code}>{code}</Text>
      <Text style={styles.rate}>{rate}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  rowPressed: { backgroundColor: '#f2f4f8' },
  flag: { fontSize: 28, marginRight: 12 },
  code: { flex: 1, fontSize: 16, fontWeight: '600' },
  rate: { fontSize: 16, fontVariant: ['tabular-nums'] },
});