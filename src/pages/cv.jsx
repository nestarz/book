import React from 'react';
import Cv from 'components/Cv';
import { PageA4 } from '../styles/print';


const Index = () => {
  return (
    <>
      <PageA4 />
      <Cv />
    </>
  )
};

export default Index;

Index.propTypes = {};