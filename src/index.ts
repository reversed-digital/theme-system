import { generate as typographyGenerator, parse as typographyParser } from './typography'
import { generate as backgroundGenerator, parse as backgroundParser } from './bg'
import { generate as flexGenerator, parse as flexParser } from './flex'
import { generate as layoutGenerator, parse as layoutParser } from './layout'
import { generate as positionGenerator, parse as positionParser } from './position'
import { generate as gridGenerator, parse as gridParser } from './grid'
import { generate as spaceGenerator, parse as spaceParser } from './space'
import { CSSProperties } from './types'
import mergeDeep from './lib/merge-deep'

export { parse as typography } from './typography'
export { parse as bg } from './bg'
export { parse as flex } from './flex'
export { parse as layout } from './layout'
export { parse as position } from './position'
export { parse as grid } from './grid'
export { parse as space } from './space'
export * from './types'

export const generator = (theme: any) => {
  if (theme) {
    let styles: CSSProperties = {}
    styles = mergeDeep(styles, spaceGenerator(theme))
    styles = mergeDeep(styles, typographyGenerator(theme))
    styles = mergeDeep(styles, backgroundGenerator(theme))
    styles = mergeDeep(styles, flexGenerator(theme))
    styles = mergeDeep(styles, layoutGenerator(theme))
    styles = mergeDeep(styles, positionGenerator(theme))
    styles = mergeDeep(styles, gridGenerator(theme))
    return styles
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`No theme was passed to generator`)
    }
    return null
  }
}
