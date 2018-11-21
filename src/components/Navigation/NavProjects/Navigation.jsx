import React from 'react';
import { Link } from 'gatsby';
import { 
    Nav
} from "./styles";


function isScrolledIntoView(el) {
  var rect = el.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;

  // Only completely visible elements return true:
  var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  // Partially visible elements return true:
  //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.nav = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.baseNavTop = 0;
  };
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };
  
  handleScroll = (event) =>  {
    if (!isScrolledIntoView(this.nav.current)) {
      this.baseNavTop = this.nav.current.getBoundingClientRect().top + window.scrollY;
      this.nav.current.style.position = `fixed`;
      this.nav.current.style.top = 0;
      this.nav.current.style.right = 0;
      this.nav.current.style.left = 0;
      this.nav.current.style.zIndex = 999;
    }
    if (window.scrollY < this.baseNavTop) {
      this.nav.current.style.position = `initial`;
    }
  };

  render() {
    return (
      <div ref={this.nav}>
        <Nav>
          <Link
            to="../"
          >
            ←
          </Link>
          /
          <Link
            to="../"
          >
            Home
          </Link>
          /
          <Link
            to="../"
          >
            Projects
          </Link>
          /
          <Link
            to="../"
          >
            {this.props.project.title}
          </Link>
        </Nav>
      </div>
    );
  }
}

export default Navigation;
