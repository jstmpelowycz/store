export enum Clause {
  Limit = 'LIMIT',
}

export const withClauseIfExists = (clause: Clause, expression?: string): string => {
  return expression
    ? `${clause} ${expression}`
    : '';
}
