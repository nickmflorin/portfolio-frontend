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
`;

const SocialIconsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 12px;
`;

// const BannerBody = styled.div`
//   position: relative;
//   top: ${props => (`${-1 * (props.theme.heights.banner)}vh`)};
//   height: ${props => (`${props.theme.heights.banner}vh`)};
//   display: flex;
//   flex-direction: column;
// `;
//
// const BannerBodyContent = styled.div`
//   margin: auto;
//   display: inline-block;
//   text-align: center;
// `;

// const Title = styled.h1`
//   font-family: ${props => props.theme.fonts.opensans};
//   font-weight: ${props => props.theme.fontweights.regular};
//   color: ${props => props.theme.colors.white};
//   width: 100%;
//   display: inline-block;
// `;
//
// const SubTitle = styled.h3`
//   font-family: ${props => props.theme.fonts.opensans};
//   font-weight: ${props => props.theme.fontweights.regular};
//   color: ${props => props.theme.colors.white};
//   width: 100%;
//   display: inline-block;
// `;

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

const Headshot = (props) => (
  <div className="headshot-container">
    <img className="headshot" src={props.src}/>
  </div>
)


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
        <BannerImage className='banner-image' image={landing} />
        <div className='banner-body'>
          <div className='banner-body-content'>
            <Headshot src={this.props.headshot} />
            <h1 className='title'>{this.props.title}</h1>
            <h3 className='sub-title'>
              {TITLE_COMPONENTS.map((text, index) =>
                <SubTitleComponent key={index} text={text} index={index} total={3}/>
              )}
            </h3>
            <div className='social-container'>
              <SocialButton icon={Github} url={this.props.github_url}/>
              <SocialButton icon={LinkedIn} url={this.props.linkedin_url}/>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default LandingBanner;
