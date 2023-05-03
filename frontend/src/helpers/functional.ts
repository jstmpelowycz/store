export const isArrayEmpty = (array: any[]): boolean => (
  array.length === 0
);

export const parsePromptQuery = (query: string | null): string[] => {
  return (query ?? '')
    .split(',')
    .map(piece => piece.trim());
};
