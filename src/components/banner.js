import React from 'react';
import styled from 'styled-components';

import landing from 'media/landing.png';
import Github from 'media/icons/Github_White.png'
import LinkedIn from 'media/icons/LinkedIn_White.png'

import { urlify } from 'utils'
import { TITLE_COMPONENTS } from 'config'
import { SocialLink } from 'components/buttons'

import './banner.sass'


const BannerImage = styled.div`
  background-image: ${props => urlify(props.image)};
`;

const Separator = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  &::before {
    content: "|";
  }
`;

const SubTitleComponent = (props) => {
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

const Banner = (props) => (
  <React.Fragment>
    <BannerImage className='banner-image' image={landing} />
    <div className='banner-body'>
      <div className='banner-body-content'>
        <Headshot src={props.headshot} />
        <h1 className='title'>{props.title}</h1>
        <h3 className='sub-title'>
          {TITLE_COMPONENTS.map((text, index) =>
            <SubTitleComponent key={index} text={text} index={index} total={3}/>
          )}
        </h3>
        <div className='social-container'>
          <SocialLink icon={Github} url={props.github_url}/>
          <SocialLink icon={LinkedIn} url={props.linkedin_url}/>
        </div>
      </div>
    </div>
  </React.Fragment>
)


export default Banner;
