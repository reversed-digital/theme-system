export type CSSProperties = {
  [key: string]: string | number | CSSProperties
}
export type ThemeProperty = { [key: string]: string | number }

export type Theme = {
  breakpoints: ThemeProperty
  fontWeights: ThemeProperty
  fontFamilies: ThemeProperty
  fontSizes: ThemeProperty
  space: ThemeProperty
  colors: ThemeProperty
}

export type ResponsiveValue<P> = P | { [key: string]: P }

/**
 * Position
 */
export type PositionProperty = 'relative' | 'absolute' | 'fixed'
export type PositionProps = {
  position?: ResponsiveValue<PositionProperty>
}

/**
 * Space
 */
export type SpaceProps<S> = {
  mt?: ResponsiveValue<keyof S>
  mr?: ResponsiveValue<keyof S>
  mb?: ResponsiveValue<keyof S>
  ml?: ResponsiveValue<keyof S>
  mx?: ResponsiveValue<keyof S>
  my?: ResponsiveValue<keyof S>
  m?: ResponsiveValue<keyof S>
  pt?: ResponsiveValue<keyof S>
  pr?: ResponsiveValue<keyof S>
  pb?: ResponsiveValue<keyof S>
  pl?: ResponsiveValue<keyof S>
  px?: ResponsiveValue<keyof S>
  py?: ResponsiveValue<keyof S>
  p?: ResponsiveValue<keyof S>
}

/**
 * Layout
 */
export type DisplayProperty =
  | 'inline'
  | 'block'
  | 'flex'
  | 'grid'
  | 'inline-block'
  | 'none'
  | 'initial'
export type SizeProperty = '100%' | 'auto' | 'screen'
export type LayoutProps = {
  display?: ResponsiveValue<DisplayProperty>
  width?: ResponsiveValue<SizeProperty>
  minWidth?: ResponsiveValue<SizeProperty>
  height?: ResponsiveValue<SizeProperty>
  minHeight?: ResponsiveValue<SizeProperty>
}

/**
 * Typograhpy
 */
export type TextAlignProperty = 'left' | 'center' | 'right'
export type TypographyProps<Families, Weights, Sizes, Colors> = {
  fontFamily?: ResponsiveValue<keyof Families>
  fontWeight?: ResponsiveValue<keyof Weights>
  fontSize?: ResponsiveValue<keyof Sizes>
  color?: ResponsiveValue<keyof Colors>
  textAlign?: ResponsiveValue<TextAlignProperty>
}

/**
 * BackgroundColor
 */
export type BackgroundColorProps<C> = {
  bg?: ResponsiveValue<keyof C>
}

/**
 * Flex
 */
export type FlexDirectionProperty = 'row' | 'row-reverse' | 'column' | 'column-reverse'
export type AlignItemsProperty = 'center' | 'flex-start' | 'flex-end'
export type JustifyContentProperty =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
export type FlexWrapProperty = 'wrap' | 'wrap-reverse'
export type FlexProps = {
  alignItems?: ResponsiveValue<AlignItemsProperty>
  flexDirection?: ResponsiveValue<FlexDirectionProperty>
  justifyContent?: ResponsiveValue<JustifyContentProperty>
  flexWrap?: ResponsiveValue<FlexWrapProperty>
}
