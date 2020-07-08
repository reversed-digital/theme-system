import {
  generateClassNamesFromObject,
  generateClassNamesFromArray,
} from './lib/generate-class-names'
import { parseClassNames } from './lib/parse-class-names'
import { CSSProperties, Theme, DisplayProperty } from './types'
import mergeDeep from './lib/merge-deep'

const display: DisplayProperty[] = ['block', 'flex', 'grid', 'initial', 'inline', 'inline-block']
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

export const generate = (theme: Theme): CSSProperties => {
  let styles: CSSProperties = {}
  styles = mergeDeep(
    styles,
    generateClassNamesFromArray({
      property: 'display',
      values: display,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateClassNamesFromObject({
      property: 'width',
      values: sizesHorizontal,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateClassNamesFromObject({
      property: 'min-width',
      values: sizesHorizontal,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateClassNamesFromObject({
      property: 'height',
      values: sizesVertical,
      breakpoints: theme.breakpoints,
    })
  )
  styles = mergeDeep(
    styles,
    generateClassNamesFromObject({
      property: 'min-height',
      values: sizesVertical,
      breakpoints: theme.breakpoints,
    })
  )
  return styles
}

export function parse(props: any, theme: Theme): string[] {
  let classNames: any[] = []
  if (props.display) {
    classNames.push(parseClassNames('display', props.display, theme))
  }
  if (props.width) {
    classNames.push(parseClassNames('width', props.width, theme))
  }
  if (props.minWidth) {
    classNames.push(parseClassNames('min-width', props.minWidth, theme))
  }
  if (props.height) {
    classNames.push(parseClassNames('height', props.height, theme))
  }
  if (props.minHeight) {
    classNames.push(parseClassNames('min-height', props.minHeight, theme))
  }
  return classNames.flat()
}
