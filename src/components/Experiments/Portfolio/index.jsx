import React from 'react';
import { Content, Wrapper } from './styles';

const Index = ({ children, className }) => {
  return (
    <Wrapper>
      <div className={"container viewport"}>
        <Content className={`content ${className}`}>
          {children}
        </Content>
      </div>
    </Wrapper>
  )
};

export default Index;

Index.propTypes = {};
