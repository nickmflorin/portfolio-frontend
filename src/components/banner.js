import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import landing from 'media/landing.png';
import Github from 'media/icons/Github_White.png'
import LinkedIn from 'media/icons/LinkedIn_White.png'

import { urlify } from 'utils'
import { TITLE_COMPONENTS } from 'config'
import { SocialButton } from 'components/buttons'

import './banner.sass'


const BannerImage = styled.div`
  background-image: ${props => urlify(props.image)};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  max-height: ${props => (`${props.theme.heights.banner}vh`)};
  padding-top: ${props => (`${0.5 * (props.theme.heights.banner)}vh`)};
  padding-bottom: ${props => (`${0.5 * (props.theme.heights.banner)}vh`)};
  border-bottom: ${props => props.theme.borders.dark};
`;

const SocialIconsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 12px;
`;

const BannerBody = styled.div`
  position: relative;
  top: ${props => (`${-1 * (props.theme.heights.banner)}vh`)};
  height: ${props => (`${props.theme.heights.banner}vh`)};
  display: flex;
  flex-direction: column;
`;

const BannerBodyContent = styled.div`
  margin: auto;
  display: inline-block;
  text-align: center;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.opensans};
  font-weight: ${props => props.theme.fontweights.regular};
  color: ${props => props.theme.colors.white};
  width: 100%;
  display: inline-block;
`;

const SubTitle = styled.h3`
  font-family: ${props => props.theme.fonts.opensans};
  font-weight: ${props => props.theme.fontweights.regular};
  color: ${props => props.theme.colors.white};
  width: 100%;
  display: inline-block;
`;

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

class Headshot extends React.Component {
  render() {
      return (
        <div className="headshot-container">
          <img className="headshot" src={this.props.src}/>
        </div>
      )
  }
}

class LandingBanner extends React.Component {
  static propTypes = {
    // Make not required temporarily so we do not hit errors when the API is still
    // loading the results.
    title: PropTypes.string,
    github_url: PropTypes.string,
    linkedin_url: PropTypes.string,
    headshot: PropTypes.string,
  }
  render(){
    return (
      <React.Fragment>
        <BannerImage image={landing} />
        <BannerBody>
          <BannerBodyContent>
            <Headshot src={this.props.headshot} />
            <Title>{this.props.title}</Title>
            <SubTitle>
              {TITLE_COMPONENTS.map((text, index) =>
                <SubTitleComponent key={index} text={text} index={index} total={3}/>
              )}
            </SubTitle>
            <SocialIconsContainer>
              <SocialButton icon={Github} url={this.props.github_url}/>
              <SocialButton icon={LinkedIn} url={this.props.linkedin_url}/>
            </SocialIconsContainer>
          </BannerBodyContent>
        </BannerBody>
      </React.Fragment>
    )
  }
}

export default LandingBanner;
