import { setGlobal } from 'reactn';

setGlobal({
  language: typeof navigator == "undefined" ? "fr" : ((navigator.language  == "fr-FR" || navigator.userLanguage  == "fr-FR") ? "fr" : "en"),
  currThemeIndex: 0,
  globalImageFocus: null
});

export const wrapRootElement = ({ element }) => {
  return element
}
