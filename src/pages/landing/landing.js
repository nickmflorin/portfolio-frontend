import React from 'react';
import styled from 'styled-components';

import landing from './landing.jpeg';

import Headshot from '../../components/headshot';
import { SocialButton } from '../../components/buttons'
import Github from './icons/Github_White.png'
import LinkedIn from './icons/LinkedIn_White.png'


const TitleComponent = (props) => {
  const separator = "|"
  if(props.index !== (props.total - 1)){
    return (
      <span>{props.text}
        <span className="separator"> {separator} </span>
      </span>
    )
  }
  return <span>{props.text}</span>
}


const Banner = styled.div`
  background-image: ${props => 'url("' + props.image + '")'};
  filter: brightness(0.4) grayscale(50%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  height: 60vh;
  padding-top: 311px;
  padding-bottom: 312px;
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
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  color: white;
  font-size: 28px;
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
      <div className='landing-page-content'>
        <Banner image={landing} />
        <LandingBody>
          <LandingBodyContent>
            <Headshot />
            <Title>
              {this.components.map((text, index) =>
                <TitleComponent key={index} text={text} index={index} total={3}/>
              )}
            </Title>
            <SocialIconsContainer>
              <SocialButton icon={Github} url={'https://github.com/nickmflorin'}/>
              <SocialButton icon={LinkedIn} url={'http://linkedin.com/'}/>
            </SocialIconsContainer>
          </LandingBodyContent>
        </LandingBody>
      </div>
    )
  }
}

export default Landing;
