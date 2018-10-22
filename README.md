# Elias Rhouzlane Gatsby Portfolio

## Features

- Gatsby v2.0.0
- MDX Support
- Configurable
    - Use the website.js to easily change the most important information
    - Easily change the font
- Uses Emotion for styling
- Projects in Markdown
- Google Analytics Support
- SEO
    - Sitemap
    - Schema.org JSONLD
    - OpenGraph Tags
    - Twitter Tags
- Offline Support
- WebApp Manifest Support
- Typography.js
- Responsive images
    - The right image size for every screen size
    - Traced SVG loading (lazy-loading)
    - WebP support

## Getting Started

Check your development environment! You'll need [Node.js](https://nodejs.org/en/), the [Gatsby CLI](https://www.gatsbyjs.org/docs/) and [node-gyp](https://github.com/nodejs/node-gyp#installation) installed. The official Gatsby website also lists two articles regarding this topic:
- [Gatsby on Windows](https://www.gatsbyjs.org/docs/gatsby-on-windows/)
- [Check your development environment](https://www.gatsbyjs.org/tutorial/part-zero/)

### Windows

```powershell
scoop install npm
npm install windows-build-tools -g
npm install --global gatsby-cl
```


### Adding new features/plugins

You can add other features by having a look at the offical [plugins page](https://www.gatsbyjs.org/docs/plugins/)

### Building your site

```
npm run build
```
Copy the content of the ``public`` folder to your webhost or use a website like Netlify which automates that for you.

## Configuration

You can configure your setup in ``config/website.js``:

You can also configure the styling of the site by editing the theme variables in ``config/theme.js``. `overlay` are the colors that get randomly selected for the Index page and the project detail view.

```JS
import { darken } from 'polished';

const brand = {
  primary: '#cf1993',
  secondary: '#7b8acc',
};

const colors = {
  grey: '#25252',
  black: '#000',
  bg_color: '#f3f3f3',
  body_color: '#222',
  link_color: brand.primary,
  link_color_hover: `${darken(0.15, brand.primary)}`,
};

export const overlay = ['#f76262', '#216583', '#65c0ba', '#35477d', '#6c5b7b', '#203541', '#9951ff', '#480032'];

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
};

export default theme;

```

**Attention:** You also need to edit ``static/robots.txt`` to include your domain!
