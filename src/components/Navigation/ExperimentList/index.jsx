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
    &:hover:before {
        content: "↘ ";
    }
  }
`

var experiments = [
    {
        url: "experiments/films/film",
        slug: "films",
        title: "Filmographie",
    },
    {
        url: "experiments/generativeArt/xp1/",
        slug: "recart",
        title: "Recurrent Art",
    },
    {
        url: "experiments/opencv/failure-detection",
        slug: "failure-detection",
        title: "Soustraction de fond",
    },
    {
        url: "experiments/filaments/suzanne",
        slug: "suzanne",
        title: "Suzanne",
    },
    {
        url: "experiments/opencv/opencv-bits",
        slug: "opencv-bits",
        title: "En clair ou crypté",
    },
    {
        url: "about/visit-card",
        slug: "visit-card",
        title: "Carte de Visite",
    },
    {
        url: "experiments/floral/floral",
        slug: "floral",
        title: "Végétal, Décors Utiles",
        versions: ["experiments/floral/floral2",]
    },
    {
        url: "experiments/fausse3D/fausse3D",
        slug: "fausse3D",
        title: "Fausse 3D",
    },
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
                    <div key={index}>
                        <Link
                            style={props}
                            key={`${experiment.slug}`}
                            to={experiment.url}
                            data-testid={`navItem-${index}`}
                            activeClassName="nav-active"
                        >
                            {experiment.title}
                        </Link>
                        {experiment.versions ? experiment.versions.map((url, i) => (
                            <span key={index}>
                                <span>{" "} — </span>
                                <Link
                                    style={props}
                                    key={i}
                                    to={url}
                                    data-testid={`navItem-${index}-${i}`}
                                    activeClassName="nav-active"
                                >
                                    v{i + 2}
                                </Link>
                            </span>
                        )
                        ) : ""}
                    </div>
                )}
            </Trail>
        </Nav>
    </Wrapper>
)

export default Navigation