export function greetByTime(now = new Date()) {
  const hour = now.getHours();
  if (hour < 12) {
    return "おはよう";
  } else if (hour < 18) {
    return "こんにちは";
  }
  return "こんばんは";
}
