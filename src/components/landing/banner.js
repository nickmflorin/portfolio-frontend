import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import landing from 'media/landing.png';
import Github from 'media/icons/Github_White.png'
import LinkedIn from 'media/icons/LinkedIn_White.png'

import { TITLE_COMPONENTS } from 'config'
import Headshot from 'components/headshot';
import { SocialButton } from 'components/buttons'


const BannerImage = styled.div`
  background-image: ${props => 'url("' + props.image + '")'};
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


class LandingBanner extends React.Component {
  static propTypes = {
    // Make not required temporarily so we do not hit errors when the API is still
    // loading the results.
    title: PropTypes.string,
    github_url: PropTypes.string,
    linkedin_url: PropTypes.string,
  }
  render(){
    return (
      <React.Fragment>
        <BannerImage image={landing} />
        <BannerBody>
          <BannerBodyContent>
            <Headshot />
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
