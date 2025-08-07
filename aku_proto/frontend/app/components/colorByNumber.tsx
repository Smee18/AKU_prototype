export default function ColorbyNumber(number: string): { text: string; color: string } {
  const value = Number(number);
  if (value <= 33) {
    return { text: 'Safe', color: 'green' };
  } else if (value >= 66) {
    return { text: 'Danger', color: 'red' };
  } else {
    return { text: 'Warning', color: 'orange' };
  }
}