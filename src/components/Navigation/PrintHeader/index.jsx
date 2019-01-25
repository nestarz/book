import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

const CVPrint = styled.div`
width: 100%;
display: flex;
justify-content: space-around;
border-bottom: 1px solid black;
padding: 30px;
font-size: 2vw;
@media print
{   
  display: none;
}
button,a {
	background: none;
	color: inherit;
	border: none;
    padding: 0;
    text-decoration: underline;
    font: inherit;
	cursor: pointer;
	outline: inherit;
}
`;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.print = this.print.bind(this);
  }

  print() {
    if (typeof window != "undefined") window.print();
  }

  render() {
    return (
      <CVPrint>
        <Link to="/">Retour</Link>
        <Link to="/about/cv">Aller au CV</Link>
        <button onClick={this.print}>Imprimer</button>
      </CVPrint>
    )
  };
};

export default Nav;