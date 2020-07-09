import {
  generateClassNamesFromArray,
  generateClassNamesFromObject,
} from './lib/generate-class-names'
import { parseClassNames } from './lib/parse-class-names'
import { validateProp } from './lib/validate-props'
import { CSSProperties, Theme, TextAlignProperty } from './types'
import mergeDeep from './lib/merge-deep'

const textAlign: TextAlignProperty[] = ['left', 'center', 'right']

export const generate = (theme: Theme): CSSProperties => {
  let styles: CSSProperties = {}
  styles = mergeDeep(
    styles,
    generateClassNamesFromObject({
      property: 'font-weight',
      values: theme.fontWeights,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateClassNamesFromObject({
      property: 'font-family',
      values: theme.fontFamilies,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateClassNamesFromArray({
      property: 'text-align',
      values: textAlign,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateClassNamesFromObject({
      property: 'color',
      values: theme.colors,
      breakpoints: theme.breakpoints,
    })
  )
  return styles
}

export function parse(props: any, theme: Theme): string[] {
  if (props.fontWeight) {
    return parseClassNames('font-weight', props.fontWeight, theme)
  }
  if (props.fontFamily) {
    return parseClassNames('font-family', props.fontFamily, theme)
  }
  if (props.textAlign) {
    return parseClassNames('text-align', props.textAlign, theme)
  }
  if (props.color) {
    return parseClassNames('color', props.color, theme)
  }
  return []
}
