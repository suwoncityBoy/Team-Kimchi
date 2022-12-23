export default function getDate() {
  const TIME_ZONE = 3240 * 10000;
  const date = new Date('2021-08-05 09:51:31');
  const result = new Date(+date + TIME_ZONE)
    .toISOString()
    .replace('T', ' ')
    .replace(/\..*/, '');

  return result;
}
