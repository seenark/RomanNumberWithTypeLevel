type Append<T extends any[], U> = [...T, U];

type CreateArrOfLen<
  N extends number,
  CurArr extends any[] = [],
> = CurArr["length"] extends N
  ? CurArr
  : CreateArrOfLen<N, Append<CurArr, any>>;

type Concat<A extends any[], B extends any[]> = [...A, ...B];

type Length<T extends any[]> = T["length"] extends number ? T["length"] : never;

type Add<A extends number, B extends number> = Length<
  Concat<CreateArrOfLen<A>, CreateArrOfLen<B>>
>;

type Sub<A extends number, B extends number> =
  CreateArrOfLen<A> extends [...CreateArrOfLen<B>, ...infer ArrA]
    ? Length<ArrA>
    : CreateArrOfLen<B> extends [...CreateArrOfLen<A>, ...infer ArrB]
      ? `-${Length<ArrB>}`
      : 0;

type ParseInt<T extends string> = T extends `${infer Digit extends number}`
  ? Digit
  : never;

type ReverseString<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${ReverseString<Rest>}${First}`
  : "";

type RemoveLeadingZeros<S extends string> = S extends "0"
  ? S
  : S extends `0${infer RestZeros}`
    ? RemoveLeadingZeros<RestZeros>
    : S;

type PutSign<S extends string> = `-${S}`;

type InternalMinusOne<S extends string> =
  S extends `${infer Digit extends number}${infer Rest}`
    ? Digit extends 0
      ? `9${InternalMinusOne<Rest>}`
      : `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]}${Rest}`
    : never;

// Ex1
// 876 - 1
// type B = InternalMinusOne<"876">;
// 8 -> [9, 0, 1, 2, 3, 4, 5, 6, 7, 8][8] = 7${Rest} = 776
// if we do reverse it before `InternalMinusOne` so
// 678 - 1
// 6 -> [9, 0, 1, 2, 3, 4, 5, 6, 7, 8][8] = 5${Rest} = 578
// then reverse again -> 875
// so now we get 876 - 1 = 875

// Ex2
// 80 - 1
// reverse -> 08
// first `infer Digit` will be 0 so use 9 for the first `9${InternalMinusOne<Rest>}` so we get 98
// do InternalMinusOne<Rest> this is inner string template
// this is Rest there is only 8
// 8 -> [9, 0, 1, 2, 3, 4, 5, 6, 7, 8][8] = 7${Rest} = 7
// now we have 9 that we get before later follow by 7 so now we have 97
// let's reverse we will get 79

type AlmostFullMinusOne<T extends number> = ParseInt<
  RemoveLeadingZeros<ReverseString<InternalMinusOne<ReverseString<`${T}`>>>>
>;

// why we need `ParseInt`
// because TS will give us type `number` instead of Literal number

// แต่ว่า case ที่เป็น 0 กับ ติดลบมันจะยังใช้ไม่ได้ก็เลยเป็น AlmostFullMinusOne น่ะแหละ
// case 0 ง่ายเลย ก็ hard code คำตอบ -1 ไปเลย
// case ติดลบนี่แหละ
// เราจะต้องเอา - sign ออกไปก่อน แล้วบวก 1 ไปที่ตัวเลข แล้วเอา - sign กลับมา ก็จะได้คำตอบ

type InternalPlusOne<S extends string> = S extends "9"
  ? "01"
  : S extends `${infer Digit extends number}${infer Rest}`
    ? Digit extends 9
      ? `0${InternalPlusOne<Rest>}`
      : `${[1, 2, 3, 4, 5, 6, 7, 8, 9][Digit]}${Rest}`
    : never;

// ก็หลักการเดียวกันกับ InternalMinusOne เลย

type MinusOne<T extends number> = T extends 0
  ? -1
  : `${T}` extends `-${infer Abs}`
    ? ParseInt<PutSign<ReverseString<InternalMinusOne<ReverseString<Abs>>>>>
    : ParseInt<
        RemoveLeadingZeros<
          ReverseString<InternalMinusOne<ReverseString<`${T}`>>>
        >
      >;

type PlusOne<T extends number> = T extends -1
  ? 0
  : `${T}` extends `-${infer Abs}`
    ? ParseInt<PutSign<ReverseString<InternalPlusOne<ReverseString<`${T}`>>>>>
    : ParseInt<
        RemoveLeadingZeros<
          ReverseString<InternalPlusOne<ReverseString<`${T}`>>>
        >
      >;

type Repeat<
  T extends string,
  Count extends number,
  Acc extends string = "",
> = Count extends 0 ? Acc : Repeat<T, MinusOne<Count>, `${Acc}${T}`>;

type Create10ToPower<Power extends number> = ParseInt<`1${Repeat<"0", Power>}`>;

type LengthOfString<
  S extends string,
  Len extends number = 0,
> = S extends `${infer _}${infer Rest}`
  ? LengthOfString<Rest, PlusOne<Len>>
  : Len;

type DropLeadingChar<S extends string, N extends number> = N extends 0
  ? S
  : S extends `${infer _}${infer Rest}`
    ? DropLeadingChar<Rest, MinusOne<N>>
    : S;

type AddBiggerPowerOf10ToN<
  PowerOf10 extends string,
  N extends string,
> = `${ReverseString<DropLeadingChar<ReverseString<PowerOf10>, LengthOfString<N>>>}${N}`;

type A = AddBiggerPowerOf10ToN<"100", "123">; // got 123, not work because n > 10^k (123 > 100)
type B = AddBiggerPowerOf10ToN<"1000", "123">; // got 1123
type C = AddBiggerPowerOf10ToN<"100000", "123">; // got 100123

type Mul<
  A extends number,
  B extends number,
  CurArr extends any[] = [],
> = CurArr["length"] extends B
  ? CurArr["length"]
  : Mul<CurArr["length"], B, [...CurArr, CreateArrOfLen<A>]>;
