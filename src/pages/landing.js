import React from 'react';
import styled from 'styled-components';

import landing from 'media/landing_tint.png';

import Headshot from 'components/headshot';
import { SocialButton } from 'components/buttons'
import Github from 'media/icons/Github_White.png'
import LinkedIn from 'media/icons/LinkedIn_White.png'
import { LandingPage } from './containers'


const Separator = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  &::before {
    content: "|";
  }
`;

const SubTitleComponent = (props) => {
  const separator = "|"
  if (props.index !== (props.total - 1)) {
    return <span>{props.text}<Separator /></span>
  }
  return <span>{props.text}</span>
}


const Banner = styled.div`
  background-image: ${props => 'url("' + props.image + '")'};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  max-height: 60vh;
  padding-top: 30vh;
  padding-bottom: 30vh;
  border-bottom: ${props => props.theme.borders.dark};
`;

const SocialIconsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  float: left;
  margin-top: 22px;
`;

const LandingBody = styled.div`
  position: relative;
  top: -60vh;  // Height of Banner
  height: 60vh;
  display: flex;
  flex-direction: column;
`;

const LandingBodyContent = styled.div`
  margin: auto;
`;

const Title = styled.h2`
  font-family: ${props => props.theme.fonts.opensans};
  font-weight: ${props => props.theme.fontweights.regular};
  color: ${props => props.theme.colors.white};
  font-size: 28px;
  width: 100%;
  letter-spacing: -0.02em;

  margin: 0 auto;
  margin-top: 12px;
`;


const SubTitle = styled.h3`
  font-family: ${props => props.theme.fonts.opensans};
  font-weight: ${props => props.theme.fontweights.regular};
  color: ${props => props.theme.colors.white};
  font-size: 24px;
  width: 100%;
  letter-spacing: -0.02em;

  margin: 0 auto;
  margin-top: 12px;
`;


class Landing extends React.Component {
  components = [
    'Engineer',
    'Technologist',
    'Developer',
  ]

  render(){
    return (
      <LandingPage>
        <Banner image={landing} />
        <LandingBody>
          <LandingBodyContent>
            <Headshot />
            <Title>Nick M. Florin</Title>
            <SubTitle>
              {this.components.map((text, index) =>
                <SubTitleComponent key={index} text={text} index={index} total={3}/>
              )}
            </SubTitle>
            <SocialIconsContainer>
              <SocialButton icon={Github} url={'https://github.com/nickmflorin'}/>
              <SocialButton icon={LinkedIn} url={'https://www.linkedin.com/in/nick-florin-5046063b/'}/>
            </SocialIconsContainer>
          </LandingBodyContent>
        </LandingBody>
      </LandingPage>
    )
  }
}

export default Landing;
