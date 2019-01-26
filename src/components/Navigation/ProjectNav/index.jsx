import React from 'react';
import { Link } from 'gatsby';
import { 
    Nav,
    TOC,
    WIP
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
function clone(hash) {
  var json = JSON.stringify(hash);
  var object = JSON.parse(json);

  return object;
}
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.nav = React.createRef();
    this.state = {
      minimalHeader: true
    }
  }

  componentDidMount() {
    ////console.log(this.nav.current.firstChild);
    window.addEventListener('scroll', this.handleScroll);
    this.baseNavTop = 0;
    this.initialNav = clone(this.nav.current.firstChild.style);
  };
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };
  
  handleScroll = (event) =>  {
    let navBar = this.nav.current.firstChild;
    if (!isScrolledIntoView(navBar)) {
      this.setState({ minimalHeader: true });
      this.baseNavTop = navBar.getBoundingClientRect().top + window.scrollY;
      navBar.style.position = `fixed`;
      navBar.style.top = 0;
      navBar.style.right = 0;
      navBar.style.left = 0;
      navBar.style.zIndex = 999;
      navBar.style.backgroundColor = "white";
      navBar.style.color = "black";
      navBar.style.borderBottom = "1px solid black";
      navBar.querySelectorAll('a').forEach(function(node) {
        node.style.color = "black";
      });
    }
    if (window.scrollY < this.baseNavTop) {
      this.setState({ minimalHeader: true });
      navBar.style.position = `initial`;
      navBar.style = this.initialNav;
      navBar.querySelectorAll('a').forEach(function(node) {
        node.style.color = "white";
      });
    }
  };

  render() {
    ////console.log(this.props);
    var tableOfContents = this.props.tableOfContents;
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
          {this.props.project.wip && (
            <WIP>Cet article est en cours de rédaction.</WIP>
          )}
          {this.state.minimalHeader && (
          <TOC>
          <ul>
            {tableOfContents && tableOfContents.items && tableOfContents.items.map((heading, index1) => {
                return (
                  <li key={index1}>
                    <h3>
                      <a href={heading.url}>{heading.title}</a>
                    </h3>
                    {heading.items && heading.items.map((heading2, index2) => {
                        return (
                          <li key={index2}>
                            <h4>
                              <a href={heading2.url}>{heading2.title}</a>
                            </h4>
                          </li>
                        );
                      })}
                  </li>
                );
              })}
            </ul>
          </TOC>
          )}
        </Nav>
      </div>
    );
  }
}

export default Navigation;
