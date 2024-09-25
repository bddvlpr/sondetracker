export const rtf = new Intl.RelativeTimeFormat('en', { style: 'short' });

export const intervals: { [unit in Intl.RelativeTimeFormatUnit]?: number } = {
  year: 60 * 60 * 24 * 365,
  month: 60 * 60 * 24 * 30,
  week: 60 * 60 * 24 * 7,
  day: 60 * 60 * 24,
  hour: 60 * 60,
  minute: 60,
  second: 1
};

export const timeAgo = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  for (const [unit, intervalInSeconds] of Object.entries(intervals)) {
    if (diffInSeconds >= intervalInSeconds || unit === 'second') {
      const value = Math.floor(diffInSeconds / intervalInSeconds);
      return value <= 0 ? 'Now' : rtf.format(-value, unit as Intl.RelativeTimeFormatUnit);
    }
  }

  return '?';
};
