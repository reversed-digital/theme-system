import { createThemeSystem } from '../../../dist'

export const theme = {
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

export const { parse, parseAll, utilities } = createThemeSystem<Theme>(theme)
