import { ThemeProperty, Theme } from 'types'

const validateBreakpoints = (name: string, prop, breakpoints: ThemeProperty) => {
  const validKeys = ['_', ...Object.keys(breakpoints)]
  Object.keys(prop).forEach((key) => {
    if (!validKeys.includes(key)) {
      console.warn(
        `Breakpoint key '${key}' found in prop ${name}, but it's not defined in theme.breakpoints`
      )
    }
  })
}

export const validateProp = (name, prop, theme: Theme) => {
  if (typeof prop === 'object') {
    validateBreakpoints(name, prop, theme.breakpoints)
  }
}
