import React from "react";
import styled from "styled-components";

const Content = styled.div``;
const Container = styled.div`
  font-size: 1vmin;
  &,
  ${Content} {
    @media not print {
      --width: 97vmin;
    }
    @media print {
      --width: 29.7cm;
    }
    height: var(--width);
    width: calc(var(--width) / 1.4141);
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
  }
`;

const Index = ({ children, className }) => {
  return (
    <Container className={"container viewport"}>
      <Content className={`content ${className}`}>{children}</Content>
    </Container>
  );
};

export default Index;

Index.propTypes = {};
