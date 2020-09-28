import {
  generateClassNamesFromArray,
  generateClassNamesFromObject,
} from './lib/generate-class-names'
import { parseClassNames } from './lib/parse-class-names'
import { DisplayProperty, Theme } from './types'

const display: DisplayProperty[] = [
  'block',
  'flex',
  'grid',
  'initial',
  'inline',
  'inline-block',
  'none',
]
const sizesHorizontal = {
  '100': '100%',
  screen: '100vw',
  auto: 'auto',
}
const sizesVertical = {
  '100': '100%',
  screen: '100vh',
  auto: 'auto',
}

export const generate = (theme: Theme): string => {
  const styles = `
    ${generateClassNamesFromObject({
      property: 'width',
      values: sizesHorizontal,
      breakpoints: theme.breakpoints,
    })}
    ${generateClassNamesFromObject({
      property: 'min-width',
      values: sizesHorizontal,
      breakpoints: theme.breakpoints,
    })}
    ${generateClassNamesFromObject({
      property: 'height',
      values: sizesVertical,
      breakpoints: theme.breakpoints,
    })}
    ${generateClassNamesFromObject({
      property: 'min-height',
      values: sizesVertical,
      breakpoints: theme.breakpoints,
    })}
    ${generateClassNamesFromArray({
      property: 'display',
      values: display,
      breakpoints: theme.breakpoints,
    })}
  `
  return styles
}

export function parse(props: any, theme: Theme): string {
  let classNames = ''
  if (props.display) {
    classNames += parseClassNames('display', props.display, theme) + ' '
  }
  if (props.width) {
    classNames += parseClassNames('width', props.width, theme) + ' '
  }
  if (props.minWidth) {
    classNames += parseClassNames('min-width', props.minWidth, theme) + ' '
  }
  if (props.height) {
    classNames += parseClassNames('height', props.height, theme) + ' '
  }
  if (props.minHeight) {
    classNames += parseClassNames('min-height', props.minHeight, theme) + ' '
  }

  return classNames.trimRight()
}
