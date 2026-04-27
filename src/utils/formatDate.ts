

/**
 * Formats date string in various common formats
 * @param dateStr - string - YYYY-MM-DD
 * @param format - options - 'year' | 'short' | 'long' | 'monthYear' - default = 'long'
 * @returns string - formatted date string
 */
export function formatDate(
  dateStr: string,
  format: 'year' | 'short' | 'long' | 'monthYear' = 'long'
): string {
  const date = new Date(dateStr);

  switch (format) {
    case 'year':
      // 2026
      return date.getFullYear().toString();
    
    case 'short': 
      // "4/27/26" or "04/27.2026" (US Format)
      return date.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit'
      });

    case 'monthYear':
      // "April 2026" or "Apr 2026"
      return date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      });

    case 'long':
      default:
        // "April 27, 2026"
        return date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
  }
};