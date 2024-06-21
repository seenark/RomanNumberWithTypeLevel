type RomanNumber<Numeric extends number> = Numeric extends 1 ? `I` : never;

export type I = RomanNumber<1>;
