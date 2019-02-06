import React from 'react'
import styled from 'styled-components'
import { animated, Spring, config } from 'react-spring'

const InformationWrapper = styled(animated.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Title = styled(animated.h1)`
  margin-top: 0;
  font-weight: 200;
  font-size: 160%;
`

const InfoBlock = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

const Header = ({ frontmatter, lg }) => <div>
  <Spring
    native
    config={config.slow}
    delay={500}
    from={{ opacity: 0 }}
    to={{ opacity: 1 }}>
    {props => (
      <InformationWrapper style={props}>
        <InfoBlock>
          <div>
            {lg == "fr" ? "À" : ""} {frontmatter.to.name}
          </div>
          {frontmatter.to.address.map((item, index) =>
            <div key={index}>{item}</div>
          )}
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
    )}
  </Spring>
  <Spring
    native
    config={config.slow}
    from={{ opacity: 0, transform: 'translate3d(0, -30px, 0)' }}
    to={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
  >
    {props => (
      <Title data-testid="frontmatter-title" style={props}>
        {frontmatter.object}
      </Title>
    )}
  </Spring>
</div>

export default Header;
