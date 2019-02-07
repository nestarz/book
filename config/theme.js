import { darken, invert } from 'polished'

const brand = {
  primary: '#3CD670',
  secondary: '#7b8acc',
}

const colors = {
  grey: '#eee',
  black: '#000',
  white: '#fff',
  bg_color: '#fff',
  body_color: '#111',
  link_color: brand.primary,
  link_color_hover: `${darken(0.15, brand.primary)}`,
}

export const theme = {
  brand,
  colors,
  breakpoints: {
    xs: '400px',
    s: '600px',
    m: '900px',
    l: '1200px',
  },
  container: {
    base: '100rem',
    text: '55rem',
  },
  spacer: {
    horizontal: '2rem',
    vertical: '3rem',
  },
}

export const dark_theme = {
  ...theme,
  //colors: Object.keys(theme.colors).reduce((acc, key) => {acc[key] = `${invert(theme.colors[key])}`; return acc; }, {}),
  colors: {
    ...theme.colors,
    grey: `${invert("#DDD")}`,
    black: '#000',
    white: '#fff',
    bg_color: '#111',
    body_color: '#fff',
  }
}
