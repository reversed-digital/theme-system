import {
  generateClassNamesFromArray,
  generateClassNamesFromObject,
} from './lib/generate-class-names'
import { parseClassNames } from './lib/parse-class-names'
import { GridColumnProperty, GridTemplateColumnsProperty, Theme } from './types'

const gridTemplates: GridTemplateColumnsProperty[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  'none',
]

let gridTemplateObject = {}
for (const key of gridTemplates) {
  if (key === 'none') {
    gridTemplateObject[key] = 'none'
  } else {
    gridTemplateObject[key] = `repeat(${key}, minmax(0, 1fr))`
  }
}

const gridColumn: GridColumnProperty[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  'auto',
]

let gridColumnObject = {}
for (const key of gridColumn) {
  if (key === 'auto') {
    gridColumnObject[key] = 'auto'
  } else {
    gridColumnObject[key] = `span ${key} / span ${key}`
  }
}

export const generate = (theme: Theme): string => {
  let styles = `
  ${generateClassNamesFromObject({
    property: 'grid-template-columns',
    values: gridTemplateObject,
    breakpoints: theme.breakpoints,
  })}
${generateClassNamesFromObject({
  property: 'grid-column-gap',
  values: theme.space,
  breakpoints: theme.breakpoints,
})}
${generateClassNamesFromObject({
  property: 'grid-column',
  values: gridColumnObject,
  breakpoints: theme.breakpoints,
})}
  ${generateClassNamesFromArray({
    property: 'grid-column-start',
    values: gridColumn,
    breakpoints: theme.breakpoints,
  })}
${generateClassNamesFromArray({
  property: 'grid-column-end',
  values: gridColumn,
  breakpoints: theme.breakpoints,
})}
  `
  return styles
}

export function parse(props: any, theme: Theme): string {
  let classNames = ''
  if (props.gridTemplateColumns) {
    classNames += parseClassNames('grid-template-columns', props.gridTemplateColumns, theme) + ' '
  }
  if (props.gridColumnGap) {
    classNames += parseClassNames('grid-column-gap', props.gridColumnGap, theme) + ' '
  }
  if (props.gridColumnStart) {
    classNames += parseClassNames('grid-column-start', props.gridColumnStart, theme) + ' '
  }
  if (props.gridColumnEnd) {
    classNames += parseClassNames('grid-column-end', props.gridColumnEnd, theme) + ' '
  }
  if (props.gridColumn) {
    classNames += parseClassNames('grid-column', props.gridColumn, theme) + ' '
  }

  return classNames.trimRight()
}
