declare type ObjKey<k> = k extends string | number | symbol ? k : any

declare type Recordable<k = string, T = any> = Record<
  k extends null | undefined ? string : ObjKey<k>,
  T
>

declare interface Fn<T = any> {
  (...arg: T[]): T
}
