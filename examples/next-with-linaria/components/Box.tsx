import React, { FC, HTMLAttributes } from 'react'
import { ThemeSystemProps, filterProps } from '../../../dist'
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
