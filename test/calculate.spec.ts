import type { Expect } from '.';
import type { Calculate } from '../src';

type Test = [
  Expect<Calculate<`(+ 1 2)`>, 3>,
  Expect<Calculate<`(+ (- 4 3) 2)`>, 3>,
  Expect<Calculate<`(+ (+ 4 -3) 2)`>, 3>,

  Expect<Calculate<`(- (* 4 -3) 2)`>, -14>,
  Expect<Calculate<`(* -4 4)`>, -16>,
  Expect<Calculate<`(* -40 -40)`>, 1600>,
  Expect<Calculate<`(* 9 +9)`>, 81>,
  Expect<Calculate<`(* 100 99)`>, 9900>,
  Expect<Calculate<`(+ (* 100 1000) 10000)`>, 110000>,

  Expect<Calculate<`(/ 300 200)`>, 1>,
  Expect<Calculate<`(/ -3 +2)`>, -1>,
  Expect<Calculate<`(/ -3 -2)`>, 1>,
  Expect<Calculate<`(/ 3 -2)`>, -1>,

  Expect<Calculate<`(% 300 200)`>, 100>,
  Expect<Calculate<`(% -3 +2)`>, -1>,
  Expect<Calculate<`(% -3 -2)`>, -1>,
  Expect<Calculate<`(% 3 -2)`>, 1>,
];
