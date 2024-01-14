import type { Expect } from '.';
import type { Parse } from '../src';

type Test = [
  Expect<Parse<`(+ 1 2)`>, ['+', '1', '2']>,
  Expect<Parse<`(+ 1 2 3)`>, ['+', '1', '2', '3']>,
  Expect<Parse<`(+ 1 2 -3)`>, ['+', '1', '2', '-3']>,
  Expect<Parse<`(+ (- 3 2) 2 (+ 1 2))`>, ['+', ['-', '3', '2'], '2', ['+', '1', '2']]>,
]
