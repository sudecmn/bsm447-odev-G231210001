import { View, Text, Button, StyleSheet } from 'react-native';

export default function RateListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Kur listesi burada olacak</Text>
      <Button
        title="Deneme: USD detayına git"
        onPress={() => navigation.navigate('RateDetail', { code: 'USD' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});