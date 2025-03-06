export function format(first?: string, middle?: string, last?: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export const formatAddress = (value: string, maxLength = 25) => {
  if (!value) {
    return value;
  }

  const ellipsis = '...';

  if (value.length <= maxLength) {
    return value;
  }

  const lengthDiff = maxLength - ellipsis.length;
  const start = value.slice(0, Math.floor(lengthDiff / 2));
  const end = value.slice(-Math.ceil(lengthDiff / 2));

  return start + ellipsis + end;
};
