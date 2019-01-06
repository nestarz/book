import { darken } from 'polished'

const brand = {
  primary: '#3CD670',//'#0000ff',
  secondary: '#7b8acc',
}

const colors = {
  grey: '#6b6b6b',
  black: '#000',
  white: '#fff',
  bg_color: '#fff',
  body_color: '#444',
  link_color: brand.primary,
  link_color_hover: `${darken(0.15, brand.primary)}`,
}

const theme = {
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

export default theme
