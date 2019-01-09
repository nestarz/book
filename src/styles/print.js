import { createGlobalStyle } from 'styled-components'

export const PageA4 = createGlobalStyle`
@page {
  size: 21cm 29.7cm; /*A4*/
  margin: 10mm; 
}
@media print {
  html, body {
    height: 100%; 
    margin: 0 !important; 
    padding: 0 !important;
    overflow: hidden;
    font-size: 11pt !important;
  }
  p
}
`

export const PageVisitCard = createGlobalStyle`
@page {
  size: 85mm 55mm; /*A4*/
  margin: 0mm; 
}
@media print {
  html, body {
    width: 85mm;
    height: 109mm; 
    margin: 0 !important; 
    padding: 0 !important;
    font-size: 11pt !important;
    overflow: hidden;
  }
  p
}
`