import { generateClassNamesFromArray } from './lib/generate-class-names'
import { parseClassNames } from './lib/parse-class-names'
import { CSSProperties, PositionProperty, Theme } from './types'

const position: PositionProperty[] = ['relative', 'absolute', 'fixed']

export const generate = (theme: Theme): string =>
  generateClassNamesFromArray({
    property: 'position',
    values: position,
    breakpoints: theme.breakpoints,
  })

export function parse(props: any, theme: Theme): string {
  if (props.position) {
    return parseClassNames('position', props.position, theme)
  }
  return ''
}
