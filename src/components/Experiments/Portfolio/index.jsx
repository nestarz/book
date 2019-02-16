import { useFullScreen } from "hooks/useFullScreen";
import React, { useState } from "react";
import { Content, Wrapper } from "./styles";

const Index = ({ children, className }) => {
  const [showFullScreen, setShowFullScreen] = useState(false);
  useFullScreen("app", showFullScreen);

  return (
    <Wrapper id="app">
      <div onClick={() => setShowFullScreen(!showFullScreen)}>
        Go Fullscreen
      </div>
      <div className={"container viewport"}>
        <Content className={`content ${className}`}>{children}</Content>
      </div>
    </Wrapper>
  );
};

export default Index;

Index.propTypes = {};
