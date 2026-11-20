const RATES_URL = 'https://api.frankfurter.dev/v1/latest?base=EUR';

export async function fetchRates() {
  const response = await fetch(RATES_URL);

  if (!response.ok) {
    throw new Error('Kurlar alınamadı');
  }

  const data = await response.json();

  const rateList = Object.entries(data.rates).map(([code, rate]) => ({
    code,
    rate,
  }));

  return { date: data.date, rates: rateList };
}