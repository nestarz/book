import React from "react";
import { animated, config, useSpring } from "react-spring";
import styled from "styled-components";

const InformationWrapper = styled(animated.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled(animated.h1)`
  margin-top: 0;
  font-weight: 200;
  font-size: 160%;
`;

const InfoBlock = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Header = ({ frontmatter, lg }) => {
  const props = useSpring({
    delay: 500,
    config: config.slow,
    from: { opacity: 0 },
    opacity: 1
  });
  const props2 = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: "translate3d(0, -30px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" }
  });
  return (
    <div>
      <InformationWrapper style={props}>
        <InfoBlock>
          <div>
            {lg == "fr" ? "À" : ""} {frontmatter.to.name}
          </div>
          {frontmatter.to.address.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
          <div>{frontmatter.to.email}</div>
        </InfoBlock>
        <InfoBlock>
          <div>
            {lg == "fr" ? "À" : ""} {frontmatter.from.lieu},
          </div>
          <div>
            {lg == "fr" ? "Le" : ""} {frontmatter.date}
          </div>
        </InfoBlock>
      </InformationWrapper>
      <Title data-testid="frontmatter-title" style={props2}>
        {frontmatter.object}
      </Title>
    </div>
  );
};
export default Header;
