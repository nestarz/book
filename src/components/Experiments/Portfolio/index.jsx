import React from 'react';
import { Wrapper, Content } from './styles';

const Index = ({children}) => {
    return (
      <Wrapper>
        <div className={"container position padding"}>
          <Content className={"content"}>
            {children}
          </Content>
        </div>
      </Wrapper>
    )
};

export default Index;

Index.propTypes = {};
