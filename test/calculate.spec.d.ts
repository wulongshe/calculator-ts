import type { Expect } from '.';
import type { Calculate } from '../src';

type Test = [
  Expect<Calculate<`(+ 1 2)`>, 3>,
  Expect<Calculate<`(+ (- 4 3) 2)`>, 3>,
  Expect<Calculate<`(+ (+ 4 -3) 2)`>, 3>,

  Expect<Calculate<`(- (* 4 -3) 2)`>, -14>,
  Expect<Calculate<`(* -4 4)`>, -16>,
  Expect<Calculate<`(* -4 -4)`>, 16>,
  Expect<Calculate<`(* 9 +9)`>, 81>,
  Expect<Calculate<`(+ (* 100 99) 99)`>, 9999>,

  Expect<Calculate<`(/ 3 2)`>, 1>,
  Expect<Calculate<`(/ -3 2)`>, -1>,
  Expect<Calculate<`(/ -3 -2)`>, 1>,
  Expect<Calculate<`(/ 3 -2)`>, -1>,

  Expect<Calculate<`(% 3 2)`>, 1>,
  Expect<Calculate<`(% -3 2)`>, -1>,
  Expect<Calculate<`(% -3 -2)`>, -1>,
  Expect<Calculate<`(% 3 -2)`>, 1>,

  // Expect<Calculate<`2`>, 2>,
]
