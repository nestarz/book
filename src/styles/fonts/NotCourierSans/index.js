import { createGlobalStyle } from "styled-components";
import NotCourierSans from "./NotCourierSans.woff";
import NotCourierSansBold from "./NotCourierSans-Bold.woff";

export const NotCourierSansFont = createGlobalStyle`
  @font-face {
    font-family: NotCourierSans;
    src: url(${NotCourierSans}) format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: NotCourierSans;
    src: url(${NotCourierSansBold}) format("woff");
    font-weight: bold;
    font-style: normal;
  }
`;

export default NotCourierSansFont;
