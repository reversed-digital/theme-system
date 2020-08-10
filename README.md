# Theme System

Theme system is a libary that combines the benefits of utility class libraries like [https://tailwindcss.com/](https://tailwindcss.com/) with the DX of css-in-js libraries like Styled Components or Emotion combined with styled-system.

At [Reversed](https://www.thinkreversed.com) we make heavy use of both styled-components and styled-system. It offers a great DX but comes at a cost, since each `Box` component and `styled.div` call adds bytes to the JS bundle and these styles are inserted during runtime. We've looked for alternatives and found [Linaria](https://linaria.now.sh/) which looks great. It's mainly the same API as styled-components, but extracts styles to static css. On the other hand we've looked at [https://tailwindcss.com/](https://tailwindcss.com/), which is gaining a lot of attention and rightfully so.

We didn't want to lose our `Box` component though and wanted the freedom of our own design system. So we've build Theme System. Theme-System combines best of both worlds; it creates a fixed set of utility-clases for maximum reusability with the DX of styled-system props.

## How to install

Run `yarn add theme-system@latest`

## Get started

For a working example with next.js & linaria, please check the examples folder.

Create a theme system config file, for example `theme-system.ts`, inside this file, create the utility classes and parser using the `createThemeSystem` function. The `createThemeSystem` function accepts a single theme object and return an object with three properties.

Your theme object should look like this:

```typescript
type Theme = {
  breakpoints: { [key: string]: string | number }
  fontWeights: { [key: string]: string | number }
  fontFamilies: { [key: string]: string | number }
  space: { [key: string]: string | number }
  colors: { [key: string]: string | number }
}
```

Example:

```typescript
// theme-system.ts
const theme = {
  breakpoints: {
    md: '1024px',
  },
  fontWeights: {
    regular: '400',
  },
  fontSizes: {
    large: '3rem',
    regular: '1rem',
  },
  fontFamilies: {
    heading: 'serif',
    body: 'sans-serif',
  },
  space: {
    '0': 0,
    '1': '1rem',
    '2': '2rem',
  },
  colors: {
    primary: '#236FEA',
    info: '#258AE7',
    success: '#27C62D',
  },
}

export type Theme = typeof theme

export const { utilities, parse, parseAll } = createThemeSystem<Theme>(theme)
```

> Note the `export type Theme = typeof theme` line, this is needed to have typechecking on your theme object.

The `utilities` property is a string containing the css with the utility classes, you should add this once inside your global css.

The `parse` & `parseAll` functions are identical in implementation, but `parse` is strictly typed based on your theme.

## parse example

The parse function allows you to generate a string of classnames based on your theme which you can use anywhere in your code. Each property can be one of the values of that property in your theme (e.g. `color: 'primary'`) or an object with one of your breakpoint keys as the key, or `_` for the initial style. For example:

```jsx
<p
  className={parse({
    color: 'primary',
    fontSize: 'large',
    fontFamily: {
      _: 'body',
      md: 'heading',
    },
  })}
>
  Using parse
</p>
```

Renders this HTML:

```html
<p class="font-family-body md-font-family-heading font-size-large color-primary">Using parse</p>
```

The `parse` function is strictly typed, so passing in invalid properties will result in a typescript.

## parseAll example

The `parseAll` function allows you to pass in a props object without strict type checking. This allows you to build custom components with typechecking on their props and passing a complete props object to `parseAll`, generating the right class names. A Box component example:

```typescript
import React, { FC, HTMLAttributes } from 'react'
import { ThemeSystemProps, filterProps } from 'theme-system'
import { Theme, parseAll } from '../lib/theme-system'
import { cx } from 'linaria'

type Props = HTMLAttributes<HTMLDivElement> & ThemeSystemProps<Theme> & {}

const Box = React.forwardRef<HTMLDivElement, Props>(({ className, children, ...props }, ref) => {
  return (
    <div className={cx(className, parseAll(props))} ref={ref} {...filterProps(props)}>
      {children}
    </div>
  )
})

export default Box
```

In this example, the `filterProps` helper removes all theme system related props from the object, preventing your div having html attributes like `color` or `height` in the DOM.

Using the Box component, a component that looks like this:

```jsx
<Box color="primary" fontSize="large" fontFamily={{ _: 'body', md: 'heading' }}>
  Using a Box component
</Box>
```

Will render output like this:

```html
<div class="font-family-body md-font-family-heading font-size-large color-primary">Using parse</div>
```

## Class names in production

> Important: the classnames are hashed in production, don't use them directly.

## API

This needs a little more documentation work but these props are enabled:

### SpaceProps

| Prop |    Value    |
| ---- | :---------: |
| mt   | theme.space |
| mr   | theme.space |
| mb   | theme.space |
| ml   | theme.space |
| mx   | theme.space |
| my   | theme.space |
| m    | theme.space |
| pt   | theme.space |
| pr   | theme.space |
| pb   | theme.space |
| pl   | theme.space |
| px   | theme.space |
| py   | theme.space |
| p    | theme.space |

### DisplayProps

| Prop      |                                Value                                 |
| --------- | :------------------------------------------------------------------: |
| display   | 'inline', 'block', 'flex', 'grid', 'inline-block', 'none', 'initial' |
| width     |                      '100%' , 'auto' , 'screen'                      |
| minWidth  |                      '100%' , 'auto' , 'screen'                      |
| height    |                      '100%' , 'auto' , 'screen'                      |
| minHeight |                      '100%' , 'auto' , 'screen'                      |

### TypographyProps

| Prop       |           Value           |
| ---------- | :-----------------------: |
| fontFamily |    theme.fontFamilies     |
| fontWeight |     theme.fontWeights     |
| fontSize   |      theme.fontSizes      |
| color      |       theme.colors        |
| textAlign  | 'left', 'center', 'right' |

### BackgroundColorProps

| Prop |    Value     |
| ---- | :----------: |
| bg   | theme.colors |

### FlexProps

| Prop           |                                Value                                |
| -------------- | :-----------------------------------------------------------------: |
| alignItems     |                 'center', 'flex-start', 'flex-end'                  |
| justifyContent | 'center', 'flex-start', 'flex-end', 'space-between', 'space-around' |
| flexWrap       |                       'wrap' ,'wrap-reverse'                        |

### GridProps

| Prop            |                                Value                                 |
| --------------- | :------------------------------------------------------------------: |
| gridColumnStart | '1','2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'auto' |
| gridColumnEnd   | '1','2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'auto' |
| gridColumn      | '1','2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'auto' |

## Future plans

- Add some form of a default grid system
- Allow variants
- See if we can use purgeCSS to remove unused utilities
- Investigate a babel-plugin to compile away the parse & parseAll calls

## Contributing

Note that this is expiremtal but ideas and pr's are welcome. Theme System is based on [TSDX](https://github.com/formik/tsdx), check that out if you'd like to contribute.
