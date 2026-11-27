const REGIONAL_INDICATOR_A = 0x1f1e6;

export function getFlagEmoji(currencyCode) {
  const countryCode = currencyCode.slice(0, 2).toUpperCase();
  const codePoints = [...countryCode].map(
    (letter) => REGIONAL_INDICATOR_A + letter.charCodeAt(0) - 65
  );
  return String.fromCodePoint(...codePoints);
}
export function parseAmount(text) {
  const normalized = text.replace(/,/g, '.');
  const value = parseFloat(normalized);
  return Number.isNaN(value) ? 0 : value;
}

export function formatAmount(value) {
  return value.toFixed(2);
}