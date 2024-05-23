export function getPathForMode(name: string): string {
  switch (name) {
    case '通常':
      return 'default';
    case 'ハモり':
      return 'harmony';
    case '練習':
      return 'practice';
    default:
      return '';
  }
}
