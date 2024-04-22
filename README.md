# CALCULATOR TS

## Description

> This is a lisp calculator made with typescript type.

## Example

```ts
import type { Calculate } from "./src";

type Result = Calculate<`(- (+ 10 30) (* 40 -2))`>; // 120
type Result = Calculate<`(* (% 33 7) (% -35 6))`>; // -25
```
