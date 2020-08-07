import { getClassName } from './get-class-name'

let breakpoints: string[] | null = null
export function parseClassNames(property: string, prop: any, theme: any): string {
  if (typeof prop === 'string') {
    return getClassName(property, prop)
  } else {
    let classnames: string[] = []
    if (!breakpoints) {
      breakpoints = Object.keys(theme.breakpoints)
    }
    for (const breakpointKey in prop) {
      if (breakpointKey === '_') {
        classnames.push(getClassName(property, prop[breakpointKey]))
      } else if (breakpoints.includes(breakpointKey)) {
        classnames.push(getClassName(property, prop[breakpointKey], breakpointKey))
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn(
            `You've use '${breakpointKey}' as a breakpoint key but it's not defined in your theme. Classname mapping is ignored for this value`
          )
        }
      }
    }
    return classnames.join(' ')
  }
}
