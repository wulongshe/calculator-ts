export type CreateTuple<N extends number, T, R extends T[] = []> = R['length'] extends N ? R : CreateTuple<N, T, [...R, T]>;

export type Operator = '+' | '-' | '*' | '/' | '%';

export type SingleNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type StringNumber = `${number}` | `+${number}` | `-${number}`

// [个, 十, 百, 千, 万, ..., 符号]
export type INumber = readonly [...SingleNumber[], boolean]

export type Expression = [Operator?, ...AST[]]

export type AST = Expression | StringNumber

export type Execute<T extends AST> =
  T extends StringNumber ? StringToINumber<T>
  : T extends [infer O extends Operator, infer A extends AST, infer B extends AST]
  ? O extends '+' ? Add<Execute<A>, Execute<B>>
  : O extends '-' ? Sub<Execute<A>, Execute<B>>
  : O extends '*' ? Mul<Execute<A>, Execute<B>>
  : O extends '/' ? Div<Execute<A>, Execute<B>>
  : O extends '%' ? Mod<Execute<A>, Execute<B>>
  : never
  : never

/**
 * @description 将字符串数字转换为数字数组
 * @template T 字符串数字
 * @template R 结果
 * @template S 符号
 * @example
 * ```ts
 * StringToINumber<`+123`> // [3, 2, 1, true]
 * StringToINumber<`-123`> // [3, 2, 1, false]
 * ```
 */
export type StringToINumber<T extends `${any}`, R extends SingleNumber[] = [], S extends boolean = true> =
  T extends `+${infer N extends number}` ? StringToINumber<`${N}`, R, true>
  : T extends `-${infer N extends number}` ? StringToINumber<`${N}`, R, false>
  : T extends `${infer A extends SingleNumber}${infer N}` ? StringToINumber<`${N}`, [A, ...R], S>
  : [...R, S]

// 消除前导0
export type TrimLeadingZero<T extends StringNumber> = T extends `0${infer N extends StringNumber}` ? TrimLeadingZero<N> : T

/**
 * @description 将数字数组转换为数字
 * @example
 * ```ts
 * INumberToNumber<[3, 2, 1, false]> // -123
 * ```
 */
export type INumberToNumber<T extends INumber, R extends `${any}` = ``> =
  T extends [infer S extends boolean]
  ? `${S extends true ? '' : '-'}${TrimLeadingZero<R>}` extends `${infer N extends number}` ? N : never
  : T extends [infer N extends SingleNumber, ...infer L extends SingleNumber[], infer S extends boolean]
  ? INumberToNumber<[...L, S], `${N}${R}`>
  : never

/**
 * @description 十以内加法矩阵
 * @template [result: number, flag: 0 | 1][][]
 * @example
 * ```ts
 * AddMatrix[4][8] // 因为 4 + 8 = 12, 12 % 10 = 2, 12 / 10 = 1, 所以结果为 [2, 1]
 * ```
 */
export type AddMatrix = [
  [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]],
  [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [0, 1]],
  [[2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [0, 1], [1, 1]],
  [[3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [0, 1], [1, 1], [2, 1]],
  [[4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [0, 1], [1, 1], [2, 1], [3, 1]],
  [[5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1]],
  [[6, 0], [7, 0], [8, 0], [9, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1]],
  [[7, 0], [8, 0], [9, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1]],
  [[8, 0], [9, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]],
  [[9, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1]],
];

/**
 * @description 十以内减法矩阵
 * @template [result: number, flag: 0 | 1][][]
 * @example
 * ```ts
 * SubMatrix[4][8] // 因为 4 < 8, 14 - 8 = 6, 所以结果为 [6, 1]
 * ```
 */
export type SubMatrix = [
  [[0, 0], [9, 1], [8, 1], [7, 1], [6, 1], [5, 1], [4, 1], [3, 1], [2, 1], [1, 1]],
  [[1, 0], [0, 0], [9, 1], [8, 1], [7, 1], [6, 1], [5, 1], [4, 1], [3, 1], [2, 1]],
  [[2, 0], [1, 0], [0, 0], [9, 1], [8, 1], [7, 1], [6, 1], [5, 1], [4, 1], [3, 1]],
  [[3, 0], [2, 0], [1, 0], [0, 0], [9, 1], [8, 1], [7, 1], [6, 1], [5, 1], [4, 1]],
  [[4, 0], [3, 0], [2, 0], [1, 0], [0, 0], [9, 1], [8, 1], [7, 1], [6, 1], [5, 1]],
  [[5, 0], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0], [9, 1], [8, 1], [7, 1], [6, 1]],
  [[6, 0], [5, 0], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0], [9, 1], [8, 1], [7, 1]],
  [[7, 0], [6, 0], [5, 0], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0], [9, 1], [8, 1]],
  [[8, 0], [7, 0], [6, 0], [5, 0], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0], [9, 1]],
  [[9, 0], [8, 0], [7, 0], [6, 0], [5, 0], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0]],
];

export type OR<B1, B2> = [B1, B2] extends [0, 0] ? 0 : 1

/**
 * @description 十以内自增偏移
 * @example
 * ```ts
 * IncreaseOffset<[9, 0], 1> // 9 + 1 = 10, 10 % 10 = 0, 10 / 10 = 1, 所以结果为 [0, 1]
 * IncreaseOffset<[1, 1], 1> // 1 + 1 = 2, 2 % 10 = 2, 2 / 10 = 0, 所以结果为 [2, 0]
 * IncreaseOffset<[2, 1], 0> // 2 + 1 = 3, 3 % 10 = 3, 3 / 10 = 0, 所以结果为 [3, 0]
 * ```
 */
export type IncreaseOffset<T extends [SingleNumber, 0 | 1], F extends 0 | 1> =
  AddMatrix[T[0]][F] extends [infer R1, infer F1] ? [R1, OR<T[1], F1>] : never

/**
 * @description 十以内自减偏移
 * @example
 * ```ts
 * DecreaseOffset<[3, 1], 1> // 3 - 1 = 2, 所以结果为 [2, 1]
 * DecreaseOffset<[0, 0], 1> // 0 < 1, 10 - 1 = 9, 所以结果为 [9, 1]
 * ```
 */
export type DecreaseOffset<T extends [SingleNumber, 0 | 1], F extends 0 | 1> =
  SubMatrix[T[0]][F] extends [infer R1, infer F1] ? [R1, OR<T[1], F1>] : never

/**
 * @description 反异或 运算 数字符号
 * @template T 数字数组
 * @template S 符号
 * @example
 * ```ts
 * XNOR_SIGN<[0, 0, 1, true], false> // [0, 0, 1, false]
 * XNOR_SIGN<[0, 0, 1, false], true> // [0, 0, 1, false]
 * XNOR_SIGN<[0, 0, 1, false], false> // [0, 0, 1, true]
 * XNOR_SIGN<[0, 0, 1, true], true> // [0, 0, 1, true]
 * ```
 */
export type XNOR_SIGN<T extends INumber, S extends boolean> = T extends [...infer N extends SingleNumber[], infer S1 extends boolean] ? [...N, XNOR<S, S1>] : never
export type XNOR<B1 extends boolean, B2 extends boolean> = B1 extends B2 ? true : false

/**
 * @description 与 运算 异或符号
 * @template T 数字数组
 * @template S 符号
 * @example
 * ```ts
 * AND_SIGN<[0, 0, 1, true], false> // [0, 0, 1, false]
 * AND_SIGN<[0, 0, 1, false], true> // [0, 0, 1, false]
 * AND_SIGN<[0, 0, 1, false], false> // [0, 0, 1, false]
 * AND_SIGN<[0, 0, 1, true], true> // [0, 0, 1, true]
 * ```
 */
export type AND_SIGN<T extends INumber, S extends boolean> = T extends [...infer N extends SingleNumber[], infer S1 extends boolean] ? [...N, AND<S, S1>] : never
export type AND<B1 extends boolean, B2 extends boolean> = B1 extends true ? B2 : false

/**
 * @description 正数加法
 * @template A 数字数组
 * @template B 数字数组
 * @template R 结果
 * @template F 进位
 * @example
 * ```ts
 * PositiveAdd<[0, 0, 1], [0, 0, 1]> // [0, 0, 2, true]
 * PositiveAdd<[9, 9], [1]> // [0, 0, 1, true]
 * ```
 */
export type PositiveAdd<A extends SingleNumber[], B extends SingleNumber[], R extends SingleNumber[] = [], F extends 0 | 1 = 0> =
  // A == [] & B != []
  [A, B] extends [[], [infer N2 extends SingleNumber, ...infer L2 extends SingleNumber[]]]
  ? IncreaseOffset<AddMatrix[0][N2], F> extends [infer N3 extends SingleNumber, infer F3 extends 0 | 1] ? PositiveAdd<[], L2, [...R, N3], F3> : never
  // A != [] & B == []
  : [A, B] extends [[infer N1 extends SingleNumber, ...infer L1 extends SingleNumber[]], []]
  ? IncreaseOffset<AddMatrix[N1][0], F> extends [infer N3 extends SingleNumber, infer F3 extends 0 | 1] ? PositiveAdd<L1, [], [...R, N3], F3> : never
  // A != [] & B != []
  : [A, B] extends [[infer N1 extends SingleNumber, ...infer L1 extends SingleNumber[]], [infer N2 extends SingleNumber, ...infer L2 extends SingleNumber[]]]
  ? IncreaseOffset<AddMatrix[N1][N2], F> extends [infer N3 extends SingleNumber, infer F3 extends 0 | 1] ? PositiveAdd<L1, L2, [...R, N3], F3> : never
  // A == [] & B == []
  : F extends 1 ? [...R, F, true] : [...R, true]

/**
 * @description 正数减法
 * @template A 数字数组
 * @template B 数字数组
 * @example
 * ```ts
 * PositiveSubHelper<[0, 0, 1], [0, 0, 1]> // [0, 0, 0, true]
 * PositiveSubHelper<[0, 0, 1], [0, 0, 2]> // [0, 0, 1, false]
 * PositiveSubHelper<[0, 0, 2], [0, 0, 1]> // [0, 0, 1, true]
 * PositiveSubHelper<[0, 0, 1], [1]> // [9, 9, 0, true]
 * ```
 */
export type PositiveSubHelper<A extends SingleNumber[], B extends SingleNumber[]> =
  PositiveSub<A, B> extends [...infer R extends SingleNumber[], true]
  ? [...R, true]
  : AND_SIGN<PositiveSub<B, A>, false>

/**
 * @description 正数减法(补码)
 * @template A 数字数组
 * @template B 数字数组
 * @template R 结果
 * @template F 退位
 * @example
 * ```ts
 * PositiveSub<[0, 0, 1], [0, 0, 1]> // [0, 0, 0, true]
 * PositiveSub<[0, 0, 1], [0, 0, 2]> // [0, 0, 9, false]
 * PositiveSub<[0, 0, 2], [0, 0, 1]> // [0, 0, 1, true]
 * PositiveSub<[0, 0, 1], [1]> // [9, 9, 0, true]
 * ```
 */
export type PositiveSub<A extends SingleNumber[], B extends SingleNumber[], R extends SingleNumber[] = [], F extends 0 | 1 = 0> =
  // A == [] & B != []
  [A, B] extends [[], [infer N2 extends SingleNumber, ...infer L2 extends SingleNumber[]]]
  ? DecreaseOffset<SubMatrix[0][N2], F> extends [infer N3 extends SingleNumber, infer F3 extends 0 | 1] ? PositiveSub<[], L2, [...R, N3], F3> : never
  // A != [] & B == []
  : [A, B] extends [[infer N1 extends SingleNumber, ...infer L1 extends SingleNumber[]], []]
  ? DecreaseOffset<SubMatrix[N1][0], F> extends [infer N3 extends SingleNumber, infer F3 extends 0 | 1] ? PositiveSub<L1, [], [...R, N3], F3> : never
  // A != [] & B != []
  : [A, B] extends [[infer N1 extends SingleNumber, ...infer L1 extends SingleNumber[]], [infer N2 extends SingleNumber, ...infer L2 extends SingleNumber[]]]
  ? DecreaseOffset<SubMatrix[N1][N2], F> extends [infer N3 extends SingleNumber, infer F3 extends 0 | 1] ? PositiveSub<L1, L2, [...R, N3], F3> : never
  // A == [] & B == []
  : F extends 1 ? [...R, false] : [...R, true]

export type Add<A extends INumber, B extends INumber> =
  [A, B] extends [[...infer AN extends SingleNumber[], infer AS extends boolean], [...infer BN extends SingleNumber[], infer BS extends boolean]]
  ? AS extends BS ? AND_SIGN<PositiveAdd<AN, BN>, AS> : XNOR_SIGN<PositiveSubHelper<AN, BN>, AS>
  : never

export type Sub<A extends INumber, B extends INumber> =
  [A, B] extends [[...infer AN extends SingleNumber[], infer AS extends boolean], [...infer BN extends SingleNumber[], infer BS extends boolean]]
  ? AS extends BS ? XNOR_SIGN<PositiveSubHelper<AN, BN>, AS> : AND_SIGN<PositiveAdd<AN, BN>, AS>
  : never

export type MulHelper<A extends INumber, B extends INumber, R extends INumber = [0, true]> =
  A extends [...0[], infer AS extends boolean] ? XNOR_SIGN<R, AS>
  : A extends [...SingleNumber[], true] ? MulHelper<Sub<A, [1, true]>, B, Add<R, B>>
  : A extends [...infer AN extends SingleNumber[], false] ? MulHelper<[...AN, true], XNOR_SIGN<B, false>, R>
  : never
export type Mul<A extends INumber, B extends INumber> = MulHelper<A, B>

export type DivModHelper<A extends INumber, B extends INumber, R extends INumber = [0, true]> =
  [A, B] extends [[...infer AN extends SingleNumber[], infer AS extends boolean], [...infer BN extends SingleNumber[], infer BS extends boolean]]
  ? PositiveSub<AN, BN> extends [...SingleNumber[], true] ? DivModHelper<AND_SIGN<PositiveSub<AN, BN>, AS>, B, Add<R, [1, true]>>
  : [XNOR_SIGN<R, XNOR<AS, BS>>, A]
  : never

export type Div<A extends INumber, B extends INumber> = DivModHelper<A, B> extends [infer R extends INumber, INumber] ? R : never
export type Mod<A extends INumber, B extends INumber> = DivModHelper<A, B> extends [INumber, infer R extends INumber] ? R : never
