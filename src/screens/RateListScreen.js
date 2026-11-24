import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchRates } from '../services/rateService';
import RateRow from '../components/RateRow';

export default function RateListScreen({ navigation }) {
  const [rates, setRates] = useState([]);
  const [rateDate, setRateDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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
    <FlatList
      data={rates}
      keyExtractor={(item) => item.code}
      renderItem={({ item }) => (
        <RateRow code={item.code} rate={item.rate} onPress={() => openDetail(item)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
});