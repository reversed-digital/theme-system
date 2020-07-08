import { generateSpaceProperty } from './lib/generate-class-names'
import { parseClassNames } from './lib/parse-class-names'
import { CSSProperties, Theme } from './types'
import { validateProp } from './lib/validate-props'
import mergeDeep from './lib/merge-deep'

export const generate = (theme: Theme): CSSProperties => {
  let styles: CSSProperties = {}
  styles = mergeDeep(
    styles,
    generateSpaceProperty({
      prefix: 'mt',
      properties: ['marginTop'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateSpaceProperty({
      prefix: 'mr',
      properties: ['marginRight'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateSpaceProperty({
      prefix: 'mb',
      properties: ['marginBottom'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateSpaceProperty({
      prefix: 'ml',
      properties: ['marginLeft'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateSpaceProperty({
      prefix: 'mx',
      properties: ['marginLeft', 'marginRight'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateSpaceProperty({
      prefix: 'my',
      properties: ['marginTop', 'marginBottom'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateSpaceProperty({
      prefix: 'm',
      properties: ['margin'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateSpaceProperty({
      prefix: 'pt',
      properties: ['paddingTop'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateSpaceProperty({
      prefix: 'pr',
      properties: ['paddingRight'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateSpaceProperty({
      prefix: 'pb',
      properties: ['paddingBottom'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateSpaceProperty({
      prefix: 'pl',
      properties: ['paddingLeft'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateSpaceProperty({
      prefix: 'px',
      properties: ['paddingLeft', 'paddingRight'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateSpaceProperty({
      prefix: 'py',
      properties: ['paddingTop', 'paddingBottom'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateSpaceProperty({
      prefix: 'p',
      properties: ['padding'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })
  )
  return styles
}

const keys = ['mt', 'mr', 'mb', 'ml', 'mx', 'my', 'm', 'pt', 'pr', 'pb', 'pl', 'px', 'py', 'p']

export function parse(props: any, theme: Theme): string[] {
  let classNames: any[] = []
  for (const key of keys) {
    if (props[key]) {
      classNames.push(parseClassNames(key, props[key], theme))
    }
  }
  return classNames.flat()
}
