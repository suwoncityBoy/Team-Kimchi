export default function getDate() {
  const TIME_ZONE = 3240 * 10000;
  const date = new Date();
  const result = new Date(+date + TIME_ZONE)
    .toISOString()
    .replace('T', ' ')
    .replace(/\..*/, '');

  return result;
}
