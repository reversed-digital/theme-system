import hash from './hash'
const removeSpecials = (key: string | number) =>
  typeof key === 'string' ? key.replace(/[^\w\s]/gi, '') : key

export function getClassName(
  property: string,
  key: string | number,
  breakpointKey?: string
): string {
  const className = `${[breakpointKey, property, removeSpecials(key)].filter((t) => t).join('-')}`
  if (process.env.NODE_ENV === 'production') {
    return `c${hash(className)}`
  } else {
    return className
  }
}
