
export function delay(ms = 700) {
  return new Promise((r) => setTimeout(r, ms));
}
