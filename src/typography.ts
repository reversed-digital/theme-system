import {
  generateClassNamesFromArray,
  generateClassNamesFromObject,
} from './lib/generate-class-names'
import { parseClassNames } from './lib/parse-class-names'
import { TextAlignProperty, Theme } from './types'

const textAlign: TextAlignProperty[] = ['left', 'center', 'right']

export const generate = (theme: Theme): string => {
  let styles: string = `
    ${generateClassNamesFromObject({
      property: 'color',
      values: theme.colors,
      breakpoints: theme.breakpoints,
    })}
    ${generateClassNamesFromObject({
      property: 'font-weight',
      values: theme.fontWeights,
      breakpoints: theme.breakpoints,
    })}
    ${generateClassNamesFromObject({
      property: 'font-family',
      values: theme.fontFamilies,
      breakpoints: theme.breakpoints,
    })}
    ${generateClassNamesFromObject({
      property: 'font-size',
      values: theme.fontSizes,
      breakpoints: theme.breakpoints,
    })}
    ${generateClassNamesFromObject({
      property: 'color',
      values: theme.colors,
      breakpoints: theme.breakpoints,
    })}
    ${generateClassNamesFromArray({
      property: 'text-align',
      values: textAlign,
      breakpoints: theme.breakpoints,
    })}
  `
  return styles
}

export function parse(props: any, theme: Theme): string {
  let classNames = ''
  if (props.fontWeight) {
    classNames += parseClassNames('font-weight', props.fontWeight, theme) + ' '
  }
  if (props.fontFamily) {
    classNames += parseClassNames('font-family', props.fontFamily, theme) + ' '
  }
  if (props.fontSize) {
    classNames += parseClassNames('font-size', props.fontSize, theme) + ' '
  }
  if (props.textAlign) {
    classNames += parseClassNames('text-align', props.textAlign, theme) + ' '
  }
  if (props.color) {
    classNames += parseClassNames('color', props.color, theme) + ' '
  }
  return classNames.trimRight()
}
