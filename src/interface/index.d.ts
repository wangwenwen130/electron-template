type ObjKey<k> = k extends string | number | symbol ? k : unknown

type Recordable<k = string, T = unknown> = Record<
  k extends null | undefined ? string : ObjKey<k>,
  T
>
