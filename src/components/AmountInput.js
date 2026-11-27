import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function AmountInput({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>€</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType="decimal-pad"
        placeholder="0"
        maxLength={12}
        selectTextOnFocus
      />
      <Text style={styles.currency}>EUR</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9dce3',
  },
  label: { fontSize: 22, fontWeight: '700', color: '#2f5bea', marginRight: 8 },
  input: { flex: 1, height: 52, fontSize: 22, fontWeight: '600' },
  currency: { fontSize: 14, color: '#888', fontWeight: '600' },
});