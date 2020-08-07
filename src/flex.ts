import { generateClassNamesFromArray } from './lib/generate-class-names'
import { parseClassNames } from './lib/parse-class-names'
import { AlignItemsProperty, FlexWrapProperty, JustifyContentProperty, Theme } from './types'

const alignItems: AlignItemsProperty[] = ['flex-start', 'center', 'flex-end']
const justifyContent: JustifyContentProperty[] = [
  'flex-start',
  'center',
  'flex-end',
  'space-around',
  'space-between',
]
const wrap: FlexWrapProperty[] = ['wrap', 'wrap-reverse']

export const generate = (theme: Theme): string => {
  let styles = `
    ${generateClassNamesFromArray({
      property: 'align-items',
      values: alignItems,
      breakpoints: theme.breakpoints,
    })}
    ${generateClassNamesFromArray({
      property: 'justify-content',
      values: justifyContent,
      breakpoints: theme.breakpoints,
    })}
    ${generateClassNamesFromArray({
      property: 'flex-wrap',
      values: wrap,
      breakpoints: theme.breakpoints,
    })}}
  `
  return styles
}

export function parse(props: any, theme: Theme): string {
  let classNames = ''
  if (props.alignItems) {
    classNames += parseClassNames('alignItems', props.alignItems, theme) + ' '
  }
  if (props.justifyContent) {
    classNames += parseClassNames('justifyContent', props.justifyContent, theme) + ' '
  }
  if (props.flexWrap) {
    classNames += parseClassNames('flexWrap', props.flexWrap, theme) + ' '
  }
  return classNames.trimRight()
}
