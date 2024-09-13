export type History<T> = { [datetime: string]: T };

export const getEntryFromEnd = <T>(history: History<T>, amount: number) => {
  const keys = Object.keys(history);
  const index = keys.length - 1 - amount;

  return index >= 0 ? history[keys[index]] : history[keys[0]];
};

export const getLastEntry = <T>(history: History<T>) => getEntryFromEnd(history, 0);
