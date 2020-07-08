import { generateClassNamesFromArray } from './lib/generate-class-names'
import { parseClassNames } from './lib/parse-class-names'
import {
  AlignItemsProperty,
  CSSProperties,
  FlexWrapProperty,
  JustifyContentProperty,
  Theme,
} from './types'
import mergeDeep from './lib/merge-deep'
import { validateProp } from 'lib/validate-props'

const alignItems: AlignItemsProperty[] = ['flex-start', 'center', 'flex-end']
const justifyContent: JustifyContentProperty[] = [
  'flex-start',
  'center',
  'flex-end',
  'space-around',
  'space-between',
]
const wrap: FlexWrapProperty[] = ['wrap', 'wrap-reverse']

export const generate = (theme: Theme): CSSProperties => {
  let styles: CSSProperties = {}
  styles = mergeDeep(
    styles,
    generateClassNamesFromArray({
      property: 'align-items',
      values: alignItems,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateClassNamesFromArray({
      property: 'justify-content',
      values: justifyContent,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateClassNamesFromArray({
      property: 'flex-wrap',
      values: wrap,
      breakpoints: theme.breakpoints,
    })
  )
  return styles
}

export function parse(props: any, theme: Theme): string[] {
  let classNames: any[] = []
  if (props.alignItems) {
    classNames.push(parseClassNames('alignItems', props.alignItems, theme))
  }
  if (props.justifyContent) {
    classNames.push(parseClassNames('justifyContent', props.justifyContent, theme))
  }
  if (props.flexWrap) {
    classNames.push(parseClassNames('flexWrap', props.flexWrap, theme))
  }
  return classNames.flat()
}
