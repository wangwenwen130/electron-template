export function memoize(_target: object, _key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const cache = new Map()

  descriptor.value = function (...args) {
    const cacheKey = args.toString()
    if (cache.has(cacheKey)) {
      console.log(`cache hit: ${cacheKey}`)
      return cache.get(cacheKey)
    }

    const result = originalMethod.apply(this, args)
    console.log(`cache miss: ${cacheKey}`)
    cache.set(cacheKey, result)
    return result
  }

  return descriptor
}
