import type { CharNumber, Expression, Operator } from './execute';

export declare type ReadonlyString = `${any}`

export declare type ParseHelper<T extends ReadonlyString, R extends Expression = []> =
  T extends `(${infer S extends ReadonlyString}`
  ? ParseHelper<S> extends [infer R1 extends Expression, infer S1 extends ReadonlyString]
  ? ParseHelper<S1, [...R, R1]>
  : never

  : T extends ` ${infer S extends ReadonlyString}` ? ParseHelper<S, R>
  : T extends `${infer O extends Operator} ${infer S extends ReadonlyString}` ? ParseHelper<S, [O]>

  : T extends `${infer N extends CharNumber} ${infer S extends ReadonlyString}` ? ParseHelper<S, [...R, `${N}`]>
  : T extends `${infer N extends CharNumber})${infer S extends ReadonlyString}` ? ParseHelper<`)${S}`, [...R, `${N}`]>

  : T extends `)${infer S extends ReadonlyString}` ? [R, S]
  : T extends `` ? [R, ``]
  : never;

export declare type Parse<T extends ReadonlyString> = ParseHelper<T> extends [[infer R extends Expression], ``] ? R : never
