/**
 * Format time in seconds to HH:MM
 *
 * @param {number} seconds
 * @returns {string}
 */
export function formatTime(seconds) {
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
