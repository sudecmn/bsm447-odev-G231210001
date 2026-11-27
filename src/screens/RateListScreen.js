import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchRates } from '../services/rateService';
import { formatDate } from '../utils/date';
import { parseAmount } from '../utils/currency';
import RateRow from '../components/RateRow';
import SearchBar from '../components/SearchBar';
import AmountInput from '../components/AmountInput';

export default function RateListScreen({ navigation }) {
  const [rates, setRates] = useState([]);
  const [rateDate, setRateDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchText, setSearchText] = useState('');
  const [amountText, setAmountText] = useState('1');

  useEffect(() => {
    loadRates();
  }, []);

  async function loadRates() {
    try {
      const result = await fetchRates();
      setRates(result.rates);
      setRateDate(result.date);
    } catch (error) {
      setErrorMessage('Kurlar yüklenemedi. İnternet bağlantını kontrol et.');
    } finally {
      setIsLoading(false);
    }
  }

  function openDetail(item) {
    navigation.navigate('RateDetail', {
      code: item.code,
      rate: item.rate,
      date: rateDate,
    });
  }

  const amount = parseAmount(amountText);

  const query = searchText.trim().toLowerCase();
  const filteredRates = rates.filter((item) =>
    item.code.toLowerCase().includes(query)
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.center}>
        <Text>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AmountInput value={amountText} onChangeText={setAmountText} />
      <SearchBar value={searchText} onChangeText={setSearchText} />

      <View style={styles.infoBar}>
        <Text style={styles.infoText}>{filteredRates.length} kayıt</Text>
        <Text style={styles.infoText}>{formatDate(rateDate)} kurları</Text>
      </View>

      <FlatList
        data={filteredRates}
        keyExtractor={(item) => item.code}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <RateRow
            code={item.code}
            rate={item.rate}
            convertedAmount={amount * item.rate}
            onPress={() => openDetail(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Sonuç bulunamadı</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  infoText: { fontSize: 13, color: '#666' },
  emptyBox: { paddingVertical: 48, alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#999' },
});