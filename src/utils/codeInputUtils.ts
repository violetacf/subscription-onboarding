export const isNumeric = (value: string): boolean => /^\d+$/.test(value);

export const mergeDigitsToCode = (digits: string[]): string => digits.join("");

export const splitCodeToDigits = (code: string, length: number): string[] => {
  const digits = code.slice(0, length).split("");
  while (digits.length < length) digits.push("");
  return digits;
};

export const isValidCode = (code: string, length: number): boolean =>
  code.length === length && isNumeric(code);
