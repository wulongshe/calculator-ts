import type { Expect } from '.';
import type { Add, Execute, INumberToNumber, StringToINumber, Sub } from '../src';

/* Test */
type Test = [
  Expect<Add<[3, true], [2, false]>, [1, true]>,
  Expect<Add<[3, true], [2, true]>, [5, true]>,
  Expect<Add<[3, false], [2, true]>, [1, false]>,
  Expect<Add<[3, false], [2, false]>, [5, false]>,

  Expect<Sub<[2, false], [2, false]>, [0, false]>,
  Expect<Sub<[3, false], [2, false]>, [1, false]>,
  Expect<Sub<[0, 0, 3, false], [0, 0, 3, false]>, [0, 0, 0, false]>,

  Expect<StringToINumber<'3'>, [3, true]>,
  Expect<StringToINumber<'2'>, [2, true]>,
  Expect<StringToINumber<'-1'>, [1, false]>,
  Expect<StringToINumber<'-108'>, [8, 0, 1, false]>,

  Expect<INumberToNumber<[3, true]>, 3>,
  Expect<INumberToNumber<[3, false]>, -3>,

  Expect<Execute<['+', '1', '2']>, [3, true]>,
  Expect<Execute<['-', '1', '2']>, [1, false]>,
];
