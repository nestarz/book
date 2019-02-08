import { Link } from "gatsby";
import Img from 'gatsby-image';
import { useGlobal } from 'reactn';
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import React, { useEffect } from "react";
import { animated, useTrail } from 'react-spring';
import useHover from 'hooks/useHover';

const config = { mass: 5, tension: 2000, friction: 200 }
const ListTemplate = ({ edges, titleLocale, fullView, className }) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage()
  const trail = useTrail(edges.length, {
    config,
    opacity: 1,
    x: 0,
    height: "auto",
    from: { opacity: 0, x: 30, height: 0 },
  })
  return <>
    <div className={"category"}>
      {titleLocale[language]}
    </div>
    <ul className={`list-items ${className}`}>
      {trail.map(({ x, height, ...rest }, index) => {
          const [hoverRef, isHovered] = useHover();
          const [globalImageFocus, setGlobalImageFocus] = useGlobal('globalImageFocus');
          useEffect(() => {
            if(isHovered && edges[index].node.frontmatter.cover) {
              setGlobalImageFocus(edges[index].node.frontmatter.cover.childImageSharp.fluid)
            } else {
              setGlobalImageFocus(null)
            }
          }, [isHovered])
        return <animated.li
          key={index}
          className="trails-text"
          style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}
          ref={hoverRef}>
          <animated.div style={{ height }}>
            {fullView && edges[index].node.frontmatter.cover &&
              <div className={"image-wrapper"}>
                <Img fluid={edges[index].node.frontmatter.cover.childImageSharp.fluid} />
              </div>
            }
            <Link
              style={rest.style}
              key={`${edges[index].node.fields.slug}-${index}`}
              to={edges[index].node.fields.slug}
              data-testid={`navItem-${index}`}
              activeClassName="nav-active"
              className={`${edges[index].node.frontmatter.cover ? "withImage" : ""}`}
            >
              {edges[index].node.frontmatter.title}
            </Link>
          </animated.div>
        </animated.li>
      })}
    </ul>
  </>
}

export default ListTemplate;
