import { CSSProperties, ThemeProperty } from 'types'
import { getClassName } from './get-class-name'

export const getMediaQuery = (size: string | number): string =>
  `@media screen and (min-width: ${size})`

type Value = string | number

type ClassNamesFromArrayArgs = {
  property: string
  values: Value[]
  breakpoints: ThemeProperty
}
export function generateClassNamesFromArray({
  property,
  values,
  breakpoints,
}: ClassNamesFromArrayArgs): string {
  let styles = ``

  for (const value of values) {
    const className = getClassName(property, value)
    styles += `
    .${className} { ${property}: ${value}; }`
  }

  for (const breakpointKey in breakpoints) {
    const query = getMediaQuery(breakpoints[breakpointKey])
    let breakpointStyles = `
    ${query} {`
    for (const value of values) {
      const className = getClassName(property, value, breakpointKey)
      breakpointStyles += `
        .${className} { ${property}: ${value}; }`
    }
    breakpointStyles += `
    }`
    styles += breakpointStyles
  }

  return styles
}

type ClassNamesFromObjectArgs<V> = {
  property: string
  values: V
  breakpoints: ThemeProperty
}

export function generateClassNamesFromObject<Values>({
  property,
  values,
  breakpoints,
}: ClassNamesFromObjectArgs<Values>): string {
  let styles = ``

  for (const key in values) {
    const className = getClassName(property, key)
    styles += `
    .${className} { ${property}: ${values[key]}; }`
  }

  for (const breakpointKey in breakpoints) {
    const query = getMediaQuery(breakpoints[breakpointKey])
    let breakpointStyles = `
    ${query} {`
    for (const key in values) {
      const className = getClassName(property, key, breakpointKey)
      breakpointStyles += `
        .${className} { ${property}: ${values[key]}; }`
    }

    breakpointStyles += `
    }`
    styles += breakpointStyles
  }

  return styles
}

export function generateSpaceProperty({ prefix, properties, values, breakpoints }: any): string {
  let styles = ``

  const valuesWithAuto = ['mt', 'mr', 'mb', 'ml', 'mx', 'my', 'm'].includes(prefix)
    ? { ...values, auto: 'auto' }
    : values

  for (const key in valuesWithAuto) {
    const className = getClassName(prefix, key)
    for (const property of properties) {
      styles += `
      .${className} { ${property}: ${valuesWithAuto[key]};}`
    }
  }

  for (const breakpointKey in breakpoints) {
    const query = getMediaQuery(breakpoints[breakpointKey])
    let breakpointStyles = `
    ${query} {`

    for (const key in valuesWithAuto) {
      const className = getClassName(prefix, key, breakpointKey)
      for (const property of properties) {
        breakpointStyles += `
        .${className} { ${property}: ${valuesWithAuto[key]};}`
      }
    }

    breakpointStyles += `
    }`
    styles += breakpointStyles
  }

  return styles
}
