import React from 'react';
import styled from 'styled-components';

import landing from 'media/landing.png';
import Github from 'media/icons/Github_White.png'
import LinkedIn from 'media/icons/LinkedIn_White.png'

import { getProfile } from 'services'

import Headshot from 'components/headshot';
import { SocialButton } from 'components/buttons'
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
  justify-content: center;
  margin-top: 12px;
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
  display: inline-block;
`;

const Title = styled.h2`
  font-family: ${props => props.theme.fonts.opensans};
  font-weight: ${props => props.theme.fontweights.regular};
  color: ${props => props.theme.colors.white};
  font-size: 28px;
  width: 100%;
  letter-spacing: -0.02em;
  margin: 12px auto;
  display: inline-block;
`;


const SubTitle = styled.h3`
  font-family: ${props => props.theme.fonts.opensans};
  font-weight: ${props => props.theme.fontweights.regular};
  color: ${props => props.theme.colors.white};
  font-size: 24px;
  width: 100%;
  letter-spacing: -0.02em;
  margin: 12px auto;
  display: inline-block;
`;


class Landing extends React.Component {
  components = [
    'Engineer',
    'Technologist',
    'Developer',
  ]
  constructor(props, context) {
    super(props, context);
    this.state = {
        github_url: null,
        linkedin_url: null
    }
  }
  componentWillMount() {
    this.getSocialUrls()
  }
  getSocialUrls() {
    var self = this
    getProfile().then((response) => {
      self.setState({
          github_url: response.github_url,
          linkedin_url: response.linkedin_url
      })
    }).catch((error) => {
      console.error('There was an error loading the resume.')
    })
  }
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
              <SocialButton icon={Github} url={this.state.github_url}/>
              <SocialButton icon={LinkedIn} url={this.state.linkedin_url}/>
            </SocialIconsContainer>
          </LandingBodyContent>
        </LandingBody>
      </LandingPage>
    )
  }
}

export default Landing;
