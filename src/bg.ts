import { generateClassNamesFromObject } from './lib/generate-class-names'
import { parseClassNames } from './lib/parse-class-names'
import { Theme } from './types'

export const generate = (theme: Theme): string =>
  generateClassNamesFromObject({
    property: 'background-color',
    values: theme.colors,
    breakpoints: theme.breakpoints,
  })

export function parse(props: any, theme: Theme): string {
  if (props.bg) {
    return parseClassNames('background-color', props.bg, theme)
  }
  return ''
}
