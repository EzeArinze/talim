export function constructUrl(key: string): string {
  const baseUrl = "https://talim.fly.storage.tigris.dev/";
  return `${baseUrl}${key}`;
}

// export function constructUrl(key: string): string {
//   if (!key || !key.trim()) return "";
//   const baseUrl = "https://talim.fly.storage.tigris.dev/";
//   return `${baseUrl}${key}`;
// }
