import { Link } from "gatsby";
import Img from "gatsby-image";
import useHover from "hooks/useHover";
import { useToggleGlobalLanguage } from "hooks/useLanguage";
import React, { useEffect, useState } from "react";
import { animated, useTrail } from "react-spring";
import { useGlobal } from "reactn";

const config = { mass: 5, tension: 2000, friction: 200 };
const ListTemplate = ({ edges, titleLocale, fullView, className }) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage();
  const [rest, setRest] = useState(false);
  const trail = useTrail(edges.length, {
    config,
    opacity: 1,
    x: 0,
    height: "auto",
    from: { opacity: 0, x: 30, height: 0 },
    delay: 100,
    onRest: () => setRest(true)
  });
  return (
    <>
      <div
        className={"category"}
        style={{ visibility: rest ? "visible" : "hidden" }}
      >
        {titleLocale[language]}
      </div>
      <ul className={`list-items ${className}`}>
        {trail.map(({ x, height, ...rest }, index) => {
          const [hoverRef, isHovered] = useHover();
          const [globalImageFocus, setGlobalImageFocus] = useGlobal(
            "globalImageFocus"
          );
          useEffect(() => {
            if (isHovered && edges[index].node.frontmatter.cover) {
              setGlobalImageFocus({
                image:
                  edges[index].node.frontmatter.cover.childImageSharp.fluid,
                text: edges[index].node.excerpt,
                title: edges[index].node.frontmatter.title,
                birthtime: edges[index].node.parent.birthtime
              });
            } else {
              //setGlobalImageFocus(null)
            }
          }, [isHovered]);
          return (
            <animated.li
              key={index}
              className="trails-text"
              style={{
                ...rest,
                transform: x.interpolate(x => `translate3d(0,${x}px,0)`)
              }}
              ref={hoverRef}
            >
              <animated.div style={{ height }}>
                {fullView && edges[index].node.frontmatter.cover && (
                  <div className={"image-wrapper"}>
                    <Img
                      fluid={
                        edges[index].node.frontmatter.cover.childImageSharp
                          .fluid
                      }
                    />
                  </div>
                )}
                <Link
                  style={rest.style}
                  key={`${edges[index].node.fields.slug}-${index}`}
                  to={edges[index].node.fields.slug}
                  data-testid={`navItem-${index}`}
                  activeClassName="nav-active"
                  className={`${
                    edges[index].node.frontmatter.cover ? "withImage" : ""
                  }`}
                >
                  {edges[index].node.frontmatter.title}
                </Link>
              </animated.div>
            </animated.li>
          );
        })}
      </ul>
    </>
  );
};

export default ListTemplate;
