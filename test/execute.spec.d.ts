import type { Expect } from '.';
import type { Add, Execute, INumberToNumber, StringToINumber, Sub } from '../src';

/* Test */
type Test = [
  Expect<Add<[true, [0, 0, 0]], [false, [0, 0]]>, [true, [0]]>,
  Expect<Add<[true, [0, 0, 0]], [true, [0, 0]]>, [true, [0, 0, 0, 0, 0]]>,
  Expect<Add<[false, [0, 0, 0]], [true, [0, 0]]>, [false, [0]]>,
  Expect<Add<[false, [0, 0, 0]], [false, [0, 0]]>, [false, [0, 0, 0, 0, 0]]>,
  Expect<Sub<[false, [0, 0]], [false, [0, 0]]>, [false, []]>,
  Expect<Sub<[false, [0, 0, 0]], [false, [0, 0]]>, [false, [0]]>,

  Expect<StringToINumber<'+3'>, [true, [0, 0, 0]]>,
  Expect<StringToINumber<'2'>, [true, [0, 0]]>,
  Expect<StringToINumber<'-1'>, [false, [0]]>,

  Expect<INumberToNumber<[true, [0, 0, 0]]>, 3>,
  Expect<INumberToNumber<[false, [0, 0, 0]]>, -3>,

  Expect<Execute<['+', '1', '2']>, [true, [0, 0, 0]]>,
  Expect<Execute<['-', '1', '2']>, [false, [0]]>,
];


