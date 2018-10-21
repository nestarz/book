import { slide as Menu } from 'react-burger-menu'
import React from 'react';
import styled from 'react-emotion'

const Wrapper = styled.div`
  a {
      color: ${props => props.theme.colors.bg_color}
  }
  /* Position and sizing of burger button */
  .bm-burger-button {
    position: absolute;
    width: 36px;
    height: 30px;
    left: 36px;
    top: 36px;
  }
  
  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: ${props => props.theme.brand.primary};
  }
  
  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  
  /* Color/shape of close button cross */
  .bm-cross {
    background: ${props => props.theme.brand.primary};
  }
  
  /* General sidebar styles */
  .bm-menu {
    background: ${props => props.theme.brand.primary};
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
  }
  
  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #373a47;
  }
  
  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;
  }
  
  /* Individual item */
  .bm-item {
    display: inline-block;
  }
  
  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0) !important;
  }
`

  
class HamburgerMenu extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
      <Wrapper>
        <Menu>
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
            <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
        </Menu>
      </Wrapper>
    );
  }
}

export default HamburgerMenu;
