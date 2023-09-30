export function formatUnixTimestamp(timestamp: number): string {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(timestamp * 1000); // Ubah ke milidetik

  return date.toLocaleDateString("en-US", options);
}
