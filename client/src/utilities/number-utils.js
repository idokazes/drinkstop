export function roundTo2Digits(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
