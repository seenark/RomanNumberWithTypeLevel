import type { Numbers, Call } from "hotscript";

type Sub<N1 extends number, N2 extends number> = Call<Numbers.Sub<N1, N2>>;

type GTE<N1 extends number, N2 extends number> = Call<
  Numbers.GreaterThanOrEqual<N1, N2>
>;

type ToRoman<N extends number> =
  GTE<N, 1000> extends true
    ? `M${ToRoman<Sub<N, 1000>>}`
    : GTE<N, 900> extends true
      ? `CM${ToRoman<Sub<N, 900>>}`
      : GTE<N, 500> extends true
        ? `D${ToRoman<Sub<N, 500>>}`
        : GTE<N, 400> extends true
          ? `CD${ToRoman<Sub<N, 400>>}`
          : GTE<N, 100> extends true
            ? `C${ToRoman<Sub<N, 100>>}`
            : GTE<N, 90> extends true
              ? `XC${ToRoman<Sub<N, 90>>}`
              : GTE<N, 50> extends true
                ? `L${ToRoman<Sub<N, 50>>}`
                : GTE<N, 40> extends true
                  ? `XL${ToRoman<Sub<N, 40>>}`
                  : GTE<N, 10> extends true
                    ? `X${ToRoman<Sub<N, 10>>}`
                    : GTE<N, 9> extends true
                      ? `IX${ToRoman<Sub<N, 9>>}`
                      : GTE<N, 5> extends true
                        ? `V${ToRoman<Sub<N, 5>>}`
                        : GTE<N, 4> extends true
                          ? `IV${ToRoman<Sub<N, 4>>}`
                          : GTE<N, 1> extends true
                            ? `I${ToRoman<Sub<N, 1>>}`
                            : "";

type III = ToRoman<3>;
type IV = ToRoman<4>;
type XII = ToRoman<12>;
type MCCLIII = ToRoman<1253>;
