/**
 * Format time in seconds to HH:MM:SS
 *
 * @param {number} seconds
 * @returns {string}
 */
export function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  const hourFormat = `${String(hours).padStart(2, "0")}:`;
  const minuteFormat = String(minutes).padStart(2, "0");
  const secondFormat = String(sec).padStart(2, "0");

  if (hours === 0) {
    return `${minuteFormat}:${secondFormat}`;
  }

  return `${hourFormat}${minuteFormat}:${secondFormat}`;
}
