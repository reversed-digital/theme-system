import { propertyToPrefix } from './property-to-prefix'
import { validateProp } from './validate-props'
import { Theme } from 'types'

const removeSpecials = (key: string | number) =>
  typeof key === 'string' ? key.replace(/[^\w\s]/gi, '') : key

const getClassName = (property: string, key: string | number, breakpointKey?: string): string =>
  `${[propertyToPrefix[property] || property, breakpointKey, removeSpecials(key)]
    .filter((t) => t)
    .join('-')}`

export function parseClassNames(property: string, prop: any, theme: Theme): string[] {
  if (typeof prop === 'string') {
    return [getClassName(property, prop)]
  } else {
    if (__DEV__) {
      validateProp('justifyContent', prop, theme)
    }
    let classnames: string[] = []
    Object.keys(prop).forEach((breakpointKey) => {
      if (breakpointKey === '_') {
        classnames.push(getClassName(property, prop[breakpointKey]))
      } else {
        classnames.push(getClassName(property, prop[breakpointKey], breakpointKey))
      }
    })
    return classnames
  }
}
