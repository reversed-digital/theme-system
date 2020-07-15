# Theme System

> _Note:_ This is not production ready

At [Reversed](https://www.thinkreversed.com) we make heavy use of both styled-components and styled-system. It offers a great DX but comes at a cost, since each `Box` component and `styled.div` call is adding bytes to the JS bundle and these styles are inserted during runtime. We've looked for alternatives and found [Linaria](https://linaria.now.sh/) which looks great. It's mainly the same API as styled-components, but extracts styles to static css. On the other hand we've looked at [https://tailwindcss.com/](https://tailwindcss.com/), which is gaining a lot of attention and rightfully so.

We didn't want to lose our `Box` component though. So we've build _Theme System_ (name suggestions welcome). Theme-System combines best of both worlds, e.g. utility-clases for maximum reusability but with the DX of styled-system props.

## How it works

First step: generating utility classes.

### Generate

The `generate` function accepts a theme object it this form:

```typescript
import { generate } from 'theme-system'

type Theme = {
  breakpoints: { [key: string]: string | number }
  fontWeights: { [key: string]: string | number }
  fontFamilies: { [key: string]: string | number }
  space: { [key: string]: string | number }
  colors: { [key: string]: string | number }
}
```

When run, `generate` will return an object of utility classes based on the values in your theme. You can use this object as a global style with any css-in-js library that supports object style css. For example, with Linaria you can do this:

```typescript
import { css } from 'linaria'
import { generate } from 'theme-system'
import { theme } from './theme'

export default css`
  :global() {
    ${generate(theme)}
  }
`
```

Then just import this file once in your application and if your bundler is setup right, you'll have list of utility classes in an external css file.

> The amount of properties is limited and based on our most used ones, keeping the css file slim. They could be extended in the future.

### Parsins

The parsers are the other half of Theme System. It maps specific props of a component to the utility classes based on your theme. By using generics we have type safety on every available property. Here is an example of a `Box` component:

```typescript
import { cx } from 'linaria'
import {
  BackgroundColorProps,
  FlexProps,
  GridProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  TypographyProps,
  bg,
  flex,
  grid,
  layout,
  position,
  space,
  typography,
} from 'theme-system'
import { theme, Theme } from './theme'

type Props = Omit<HTMLAttributes<HTMLElement>, 'color'> &
  PositionProps &
  SpaceProps<Theme['space']> &
  LayoutProps &
  TypographyProps<Theme['fontFamilies'], Theme['fontWeights'], Theme['colors']> &
  BackgroundColorProps<Theme['colors']> &
  FlexProps &
  GridProps<Theme['space']>

const Box: FC<Props> = ({ children, className, ...rest }) => {
  const classNames = [
    ...bg(rest, theme),
    ...flex(rest, theme),
    ...grid(rest, theme),
    ...layout(rest, theme),
    ...position(rest, theme),
    ...space(rest, theme),
    ...typography(rest, theme),
  ]
  return <div className={cx(...classNames, className)}>{children}</div>
}

export default Box
```

> To ensure type safety, make sure you export the type of your Theme like so: `export type Theme = typeof theme`

Given that `theme.ratio["0"]` exists using `<Box mt="0"></Box>` would render `<div className="mt-0"></div>`.

### Media queries

Equal to styled-system you can use media queries like so: `<Box mt={{_: "0", lg: "2"}}/>`. Use the `_` key for your initial styles, the following keys (like `lg`) has to match the keys of `theme.breakpoints`. You'll receive a warning in development if it doens't.

### Filter props

<<<<<<< HEAD
To prevent props being passed on to the DOM you can use the `filterProps` utility, which will remove any theme-system props from a props object.
=======
To prevent props being passed on to the DOM you can use the `filterProps` utility, this will remove any theme-system props from a props object.
>>>>>>> 02950437f4ce2f1a542a3f7cb782b9b1005429b3

```typescript
import {filterProps} from 'theme-system'

const Text: FC<Props> = ({
  children,
  className,
  ...rest
}) => {
  const classNames = [
    ...space(rest, theme),
    ...typography(rest, theme),
    className
  ];

  return (
    <p className={cx(...classNames)} {...filterProps(rest)}>
      {children}
    </p>
  );
};
```

## Contributing

Note that this is expiremtal but ideas and pr's are welcome. Theme System is based on [TSDX](https://github.com/formik/tsdx), check that out if you'd like to contribute.
