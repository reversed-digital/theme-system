import { generateClassNamesFromObject } from './lib/generate-class-names'
import { parseClassNames } from './lib/parse-class-names'
import { validateProp } from './lib/validate-props'
import { CSSProperties, Theme } from './types'

export const generate = (theme: Theme): CSSProperties =>
  generateClassNamesFromObject({
    property: 'background-color',
    values: theme.colors,
    breakpoints: theme.breakpoints,
  })

export function parse(props: any, theme: Theme): string[] {
  if (props.bg) {
    return parseClassNames('bg', props.bg, theme)
  }
  return []
}
