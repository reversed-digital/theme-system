import { generate as typographyGenerator, parse as typography } from './typography'
import { generate as backgroundGenerator, parse as bg } from './bg'
import { generate as flexGenerator, parse as flex } from './flex'
import { generate as layoutGenerator, parse as layout } from './layout'
import { generate as positionGenerator, parse as position } from './position'
import { generate as spaceGenerator, parse as space } from './space'
import {
  Theme,
  PositionProps,
  SpaceProps,
  LayoutProps,
  TypographyProps,
  BackgroundColorProps,
  FlexProps,
} from './types'

export { filterProps } from './filter-props'
export * from './types'

export const generator = (theme: any): string => {
  if (!theme) {
    throw new Error('No theme was passed to generator')
  }
  const utilities = `
    ${spaceGenerator(theme)}
    ${typographyGenerator(theme)}
    ${backgroundGenerator(theme)}
    ${flexGenerator(theme)}
    ${layoutGenerator(theme)}
    ${positionGenerator(theme)}
  `
  return utilities
}

type Object = {
  [key: string]: any
}

export type ThemeSystemProps<T extends Theme> = PositionProps &
  SpaceProps<T['space']> &
  LayoutProps &
  TypographyProps<T['fontFamilies'], T['fontWeights'], T['fontSizes'], T['colors']> &
  BackgroundColorProps<T['colors']> &
  FlexProps

function createParser<T>(theme): (props: T, additionalClassName?: string) => string {
  function parse(props: T, additionalClassName?: string) {
    return [
      space(props, theme),
      typography(props, theme),
      bg(props, theme),
      flex(props, theme),
      layout(props, theme),
      position(props, theme),
      additionalClassName,
    ]
      .filter((s) => s && s.length)
      .join(' ')
      .trim()
  }
  return parse
}

export function createThemeSystem<T extends Theme>(theme: Object) {
  const utilities = generator(theme)
  const parse = createParser<ThemeSystemProps<T>>(theme)
  const parseAll = createParser<Object>(theme)
  return {
    utilities,
    parse,
    parseAll,
  }
}
