A record of works from summer 2018 when I joined Renoir and started to play with clay, code and interactive media. Feel free to tweak and make your own version. [https://eliasrhouzlane.com](https://eliasrhouzlane.com)

[![CircleCI](https://circleci.com/gh/nestarz/book.svg?style=svg)](https://circleci.com/gh/nestarz/book)

## Features

- CSV Loader Support
    - Allow `import csv from "file.csv"`
- Configurable
    - Use the website.js to easily change the most important information
    - Easily change the font
- Choose a color for your projects highlights
- Create your subpages with MDX
- Adds a table of contents to Markdown files using gatsby-remark-toc
- Uses styled-components for styling
- [react-spring](https://github.com/react-spring/react-spring) animations
- Projects in MDX ([gatsby-mdx](https://github.com/ChristopherBiscardi/gatsby-mdx))
- Cypress for End-to-End testing (+ CircleCI config)
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
- Filament Mobile-first library for physically based rendering support

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

## Todo
- app-193e7b265f42671e4d39.js is 2.14 MB, and won't be precached. Configure maximumFileSizeToCacheInBytes to change this limit.