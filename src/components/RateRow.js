import { Pressable, View, Text, StyleSheet } from 'react-native';
import { getFlagEmoji, formatAmount } from '../utils/currency';

export default function RateRow({ code, rate, convertedAmount, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={onPress}
    >
      <Text style={styles.flag}>{getFlagEmoji(code)}</Text>

      <View style={styles.info}>
        <Text style={styles.code}>{code}</Text>
        <Text style={styles.rateText}>1 EUR = {rate} {code}</Text>
      </View>

      <Text style={styles.amount}>{formatAmount(convertedAmount)}</Text>
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
  info: { flex: 1, marginRight: 12 },
  code: { fontSize: 16, fontWeight: '600' },
  rateText: { fontSize: 12, color: '#888', marginTop: 2 },
  amount: { fontSize: 17, fontWeight: '600', fontVariant: ['tabular-nums'] },
});