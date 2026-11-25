import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchRates } from '../services/rateService';
import RateRow from '../components/RateRow';
import SearchBar from '../components/SearchBar';

export default function RateListScreen({ navigation }) {
  const [rates, setRates] = useState([]);
  const [rateDate, setRateDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchText, setSearchText] = useState('');

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
      <SearchBar value={searchText} onChangeText={setSearchText} />
      <FlatList
        data={filteredRates}
        keyExtractor={(item) => item.code}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <RateRow code={item.code} rate={item.rate} onPress={() => openDetail(item)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
});