import React from 'react'
import { Link } from 'gatsby'
import { Trail } from 'react-spring'
import styled from 'styled-components'
import config from '../../../../config/website'

const Wrapper = styled.header`
    mix-blend-mode: multiply;
    flex-direction: column;
    display: flex;
    position: relative;
    z-index: 1000;
    a {
        color: ${props => props.theme.colors.black};
        text-decoration: none;
        transition: all 0.3s ease-in-out;
        z-index: 100;
        &:hover {
            color: ${props => props.theme.brand.primary};
        }
    }
    @media (max-width: ${props => props.theme.breakpoints.s}) {
        flex-wrap: wrap;
    }
`

const Nav = styled.nav`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  padding: 0;
  flex-direction: column;
  a {
    font-size: 180%;
    &:hover:before {
        content: "↘ ";
    }
  }
`

var experiments = [
    {
        url: "experiments/floral",
        slug: "floral",
        title: "Floral Experiment"
    },
    {
        url: "experiments/fausse3D",
        slug: "fausse3D",
        title: "Fausse 3D",
    }
]

const Navigation = () => (
    <Wrapper data-testid="experiments-navigation">
        <Nav>
            <Trail
                items={experiments}
                keys={experiment => experiment.slug}
                from={{ opacity: '0' }}
                to={{ opacity: '1' }}>
                {(experiment, index) => props => (
                    <Link
                        style={props}
                        key={experiment.slug}
                        to={experiment.url}
                        data-testid={`navItem-${index}`}
                        activeClassName="nav-active"
                    >
                        {experiment.title}
                    </Link>
                )}
            </Trail>
        </Nav>
    </Wrapper>
)

export default Navigation