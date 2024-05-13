export function cache(_target: object, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  descriptor.value = function (...args: any[]) {
    console.log('wrapped function: before invoking ' + propertyKey)
    const result = originalMethod.apply(this, args)
    console.log('wrapped function: after invoking ' + propertyKey)
    return result
  }
}

// function Greeter(greeting: string) {
//   return function (target: Function) {
//     target.prototype.greet = function (): void {
//       console.log(greeting);
//     };
//   };
// }
