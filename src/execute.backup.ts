export type Operator = '+' | '-' | '*' | '/' | '%';

export type INumberValue = readonly 0[];
export type INumber<S extends boolean = boolean, V extends INumberValue = INumberValue> = [sign: S, value: V];

export type Not<B extends boolean> = B extends true ? false : true;

export type And<A extends INumber, B extends INumber> = INumber<A[0], [...A[1], ...B[1]]>;

export type Diff<A extends INumber, B extends INumber> = A[1] extends [...B[1], ...infer N extends INumberValue]
  ? INumber<A[0], N>
  : B[1] extends [...A[1], ...infer N extends INumberValue]
  ? INumber<B[0], N>
  : INumber<true, []>;

export type Inc<A extends INumber> = Add<A, [true, [0]]>;
export type Dec<A extends INumber> = Sub<A, [true, [0]]>;

export type CreateTuple<N extends number, T, R extends T[] = []> = R['length'] extends N
  ? R
  : CreateTuple<N, T, [...R, T]>;

export type Add<A extends INumber, B extends INumber> = A[0] extends B[0] ? And<A, B> : Diff<A, B>;
export type Sub<A extends INumber, B extends INumber> = A[0] extends B[0]
  ? Diff<A, [Not<B[0]>, B[1]]>
  : And<A, [Not<B[0]>, B[1]]>;

export type MulHelper<A extends INumber, B extends INumber, R extends INumber = INumber<true, []>> = A[1] extends []
  ? INumber<A[0] extends R[0] ? true : false, R[1]>
  : A[0] extends true
  ? MulHelper<Dec<A>, B, Add<R, B>>
  : MulHelper<INumber<true, A[1]>, INumber<Not<B[0]>, B[1]>, R>;
export type Mul<A extends INumber, B extends INumber> = MulHelper<A, B>;

export type DivModHelper<A extends INumber, B extends INumber, R extends INumber = INumber<true, []>> = A[1] extends [
  ...B[1],
  ...infer N extends INumberValue,
]
  ? DivModHelper<INumber<A[0], N>, B, Inc<R>>
  : [INumber<A[0] extends B[0] ? true : false, R[1]>, A];

export type Div<A extends INumber, B extends INumber> = DivModHelper<A, B> extends [infer R extends INumber, INumber]
  ? R
  : never;
export type Mod<A extends INumber, B extends INumber> = DivModHelper<A, B> extends [INumber, infer R extends INumber]
  ? R
  : never;

export type CharNumber = `${number}` | `+${number}` | `-${number}`;

export type StringToINumber<T extends CharNumber> = T extends `+${infer N extends number}`
  ? INumber<true, CreateTuple<N, 0>>
  : T extends `-${infer N extends number}`
  ? INumber<false, CreateTuple<N, 0>>
  : T extends `${infer N extends number}`
  ? INumber<true, CreateTuple<N, 0>>
  : never;

export type INumberToNumber<T extends INumber> = `${T[0] extends true
  ? ''
  : '-'}${T[1]['length']}` extends `${infer N extends number}`
  ? N
  : never;

export type Expression = [Operator?, ...AST[]];
export type AST = Expression | CharNumber;

export type Execute<T extends AST> = T extends CharNumber
  ? StringToINumber<T>
  : T extends [infer O extends Operator, infer A extends AST, infer B extends AST]
  ? O extends '+'
    ? Add<Execute<A>, Execute<B>>
    : O extends '-'
    ? Sub<Execute<A>, Execute<B>>
    : O extends '*'
    ? Mul<Execute<A>, Execute<B>>
    : O extends '/'
    ? Div<Execute<A>, Execute<B>>
    : O extends '%'
    ? Mod<Execute<A>, Execute<B>>
    : never
  : never;
