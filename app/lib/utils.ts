/**
 * Formats a number of bytes into a human-readable string
 * @param bytes - The number of bytes to format
 * @returns A human-readable string (e.g., "1.5 MB", "500 KB", "2 GB")
 */
export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  // Handle edge case where bytes is less than 1 KB
  if (i === 0) {
    return `${bytes} ${sizes[i]}`;
  }
  
  // Format to 1 decimal place for KB, MB, GB
  const size = bytes / Math.pow(k, i);
  return `${size.toFixed(1)} ${sizes[i]}`;
}
export const generateUUID = () => {
  // crypto.randomUUID throws if crypto is unavailable; surface error clearly
  return crypto.randomUUID();
};