import type { Execute, INumberToNumber } from './execute';
import type { Parse, ReadonlyString } from './parse';

export declare type Calculate<T extends ReadonlyString> = INumberToNumber<Execute<Parse<T>>>
