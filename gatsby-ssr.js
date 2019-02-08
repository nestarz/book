import React from 'react';
import { setGlobal } from 'reactn';

setGlobal({
  language: typeof navigator == "undefined" ? "fr" : ((navigator.language  == "fr-FR" || navigator.userLanguage  == "fr-FR") ? "fr" : "en"),
  currThemeIndex: 1
});

export const wrapRootElement = ({ element }) => {
  return element
}

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <noscript key="noscript">
      Please activate JavaScript to use this site. If you have further problems please try to deactivate the service
      worker, too.
    </noscript>,
  ])
}
