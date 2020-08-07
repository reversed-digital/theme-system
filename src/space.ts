import { generateSpaceProperty } from './lib/generate-class-names'
import { parseClassNames } from './lib/parse-class-names'
import { Theme } from './types'

export const generate = (theme: Theme): string => {
  let styles = `
      ${generateSpaceProperty({
        prefix: 'mt',
        properties: ['margin-top'],
        values: theme.space,
        breakpoints: theme.breakpoints,
      })}
    ${generateSpaceProperty({
      prefix: 'mr',
      properties: ['margin-right'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })}
    ${generateSpaceProperty({
      prefix: 'mb',
      properties: ['margin-bottom'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })}
    ${generateSpaceProperty({
      prefix: 'ml',
      properties: ['margin-left'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })}
    ${generateSpaceProperty({
      prefix: 'mx',
      properties: ['margin-left', 'margin-right'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })}
    ${generateSpaceProperty({
      prefix: 'my',
      properties: ['margin-top', 'margin-bottom'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })}
    ${generateSpaceProperty({
      prefix: 'm',
      properties: ['margin'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })}
    ${generateSpaceProperty({
      prefix: 'pt',
      properties: ['padding-top'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })}
    ${generateSpaceProperty({
      prefix: 'pr',
      properties: ['padding-right'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })}
    ${generateSpaceProperty({
      prefix: 'pb',
      properties: ['padding-bottom'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })}
    ${generateSpaceProperty({
      prefix: 'pl',
      properties: ['padding-left'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })}
    ${generateSpaceProperty({
      prefix: 'px',
      properties: ['padding-left', 'padding-right'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })}
    ${generateSpaceProperty({
      prefix: 'py',
      properties: ['padding-top', 'padding-bottom'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })}
    ${generateSpaceProperty({
      prefix: 'p',
      properties: ['padding'],
      values: theme.space,
      breakpoints: theme.breakpoints,
    })}`
  return styles
}

const keys = ['mt', 'mr', 'mb', 'ml', 'mx', 'my', 'm', 'pt', 'pr', 'pb', 'pl', 'px', 'py', 'p']

export function parse(props: any, theme: Theme): string {
  let classNames = ''
  for (const key of keys) {
    if (props[key]) {
      classNames += parseClassNames(key, props[key], theme) + ' '
    }
  }
  return classNames.trimRight()
}
