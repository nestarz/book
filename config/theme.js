import { darken } from 'polished';

const brand = {
  primary: '#3CD670',//'#0000ff',
  secondary: '#FFF',
};

const colors = {
  grey: '#25252',
  black: '#111',
  red: '#eb1c24',
  white: '#ffffff',
  bg_color: "#24292e",//'#202121',
  body_color: "#fff",//'#ebebeb',
  link_color: brand.primary,
  link_color_hover: `${darken(0.15, brand.primary)}`,
};

export const overlay = ['#111'];

const light = {
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
    horizontal: '4rem',
    vertical: '6rem',
  },
};

const dark = {
  brand,
  colors: { 
    ...colors, 
    bg_color: '#111',
    body_color: '#fff',
  },
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
    horizontal: '4rem',
    vertical: '6rem',
  },
};

const theme = {
  light,
  dark
};

export default theme;
