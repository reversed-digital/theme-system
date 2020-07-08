import { CSSProperties, ThemeProperty } from 'types'
import { propertyToPrefix } from './property-to-prefix'

const getClassName = (property: string, key: string | number, breakpointKey?: string): string =>
  `.${[propertyToPrefix[property] || property, breakpointKey, key].filter((t) => t).join('-')}`

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
}: ClassNamesFromArrayArgs): CSSProperties {
  let styles: CSSProperties = {}

  for (const value of values) {
    styles[getClassName(property, value)] = {
      [property]: value,
    }
  }

  for (const breakpointKey in breakpoints) {
    const query = getMediaQuery(breakpoints[breakpointKey])

    let breakpointStyles = {}
    for (const value of values) {
      breakpointStyles[getClassName(property, value, breakpointKey)] = {
        [property]: value,
      }
    }

    styles[query] = breakpointStyles
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
}: ClassNamesFromObjectArgs<Values>): CSSProperties {
  let styles: CSSProperties = {}
  for (const key in values) {
    const className = getClassName(property, key)
    styles[className] = {}
    styles[className][property] = values[key]
  }

  for (const breakpointKey in breakpoints) {
    const query = getMediaQuery(breakpoints[breakpointKey])
    let breakpointStyles: CSSProperties = {}
    for (const key in values) {
      const className = getClassName(property, key, breakpointKey)
      breakpointStyles[className] = {}
      breakpointStyles[className][property] = values[key]
    }
    styles[query] = breakpointStyles
  }

  return styles
}

export function generateSpaceProperty({
  prefix,
  properties,
  values,
  breakpoints,
}: any): CSSProperties {
  let styles: CSSProperties = {}
  const valuesWithAuto = { ...values, auto: 'auto' }
  for (const key in valuesWithAuto) {
    const className = getClassName(prefix, key)
    styles[className] = {}
    for (const property of properties) {
      styles[className][property] = valuesWithAuto[key]
    }
  }

  for (const breakpointKey in breakpoints) {
    const query = getMediaQuery(breakpoints[breakpointKey])
    if (!styles[query]) {
      styles[query] = {}
    }
    for (const key in valuesWithAuto) {
      const className = getClassName(prefix, key, breakpointKey)
      styles[query][className] = {}
      for (const property of properties) {
        styles[query][className][property] = valuesWithAuto[key]
      }
    }
  }

  return styles
}
