import { setGlobal } from 'reactn';

setGlobal({
  language: typeof navigator == "undefined" ? "fr" : ((navigator.language  == "fr-FR" || navigator.userLanguage  == "fr-FR") ? "fr" : "en"),
  currThemeIndex: 1,
  globalImageFocus: null
});

export const wrapRootElement = ({ element }) => {
  return element
}
