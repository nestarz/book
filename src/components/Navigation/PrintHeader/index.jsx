import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

const CVPrint = styled.div`
width: 100%;
display: flex;
justify-content: space-around;
border-bottom: 1px solid black;
padding: 30px;
font-size: 1.8rem;
@media (min-width: 1600px) {
  font-size: 2vw;
}
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

const Nav = ({lg, setLanguage}) => {
  return (
    <CVPrint>
      <Link to="/">{lg == "fr" ? 'Retour' : 'Back'}</Link>
      <button onClick={() => window.print()}>{lg == "fr" ? 'Imprimer' : 'Print'}</button>
      <button onClick={() => setLanguage(lg == "fr" ? "en" : "fr")}>
        En/Fr
      </button>
    </CVPrint>
  )
}

export default Nav;