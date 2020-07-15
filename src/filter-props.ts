import memoize from './lib/memoize'

const props = [
  'bg',
  'alignItems',
  'justifyContent',
  'flexWrap',
  'gridTemplateColumns',
  'gridColumnGap',
  'gridColumnStart',
  'gridColumnEnd',
  'gridColumn',
  'display',
  'width',
  'minWidth',
  'height',
  'minHeight',
  'position',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'm',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  'p',
  'fontWeight',
  'fontFamily',
  'textAlign',
  'color',
]

const regex = new RegExp(`^(${props.join('|')})$`)

const shouldForwardProp = memoize((prop) => !regex.test(prop))

type Props = {
  [key: string]: any
}
export const filterProps = (props: Props) => {
  if (typeof props === 'object') {
    const filtered = {}
    for (const key in props) {
      if (props.hasOwnProperty(key) && shouldForwardProp(key)) {
        filtered[key] = props[key]
      }
    }
    return filtered
  }
  return props
}
