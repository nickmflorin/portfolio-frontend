import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { faGraduationCap, faMapMarkerAlt, faBookOpen } from '@fortawesome/free-solid-svg-icons'

import { IconizedText } from './icons'


const StyledItem = styled.div`
  display: flex;
  max-width: 800px;
  margin: 0px auto 20px auto;
  border: 1px solid #EFEFEF;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.white}
`

const LogoContainer = styled.div`
  min-width: 80px;
  min-height: 80px;
  max-width: 80px;
  max-height: 80px;
  padding: 10px;
  display: inline-block;
`;

const Logo = styled.img`
  height: 100%;
  width: 100%;
`;


const Detail = styled.div`
  padding: 12px;
  text-align: left;
  margin-top: 6px;
  display: inline-block;
`;

const DetailHeader = styled.div`
  margin-bottom: 10px;
`;

const DetailBody = styled.div`
`;



const Title = styled.h3`
  color: ${props => props.theme.colors.text1};
  letter-spacing: 0.02em;
`;

const SubTitle = styled.h4`
  font-size: 16px;
  line-height: 16px;
  font-family: ${props => props.theme.fonts.opensans};
  font-weight: ${props => props.theme.fontweights.regular};
  color: ${props => props.theme.colors.text2};
`

const Description = styled.p`
  font-size: 16px;
  line-height: 18px;
  margin-bottom: 2px;
  margin-top: 10px;
  font-family: ${props => props.theme.fonts.roboto};
  font-weight: ${props => props.theme.fontweights.light};
  color: ${props => props.theme.colors.text2};
`;


class Item extends React.Component {
  static defaultProps = {
    subheader: [],
    footer: [],
  }
  static propTypes = {
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sub_title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }
  render() {
    // TODO: Create an icon for logos that could not be loaded.
    return (
      <StyledItem>
        <LogoContainer>
          <Logo alt="Could not Load" src={this.props.logo} />
        </LogoContainer>
        <Detail>
          <DetailHeader>
            <Title>{this.props.title}</Title>
            <SubTitle>{this.props.sub_title}</SubTitle>
          </DetailHeader>
          <DetailBody>
            <IconizedText text={this.props.location} icon={faMapMarkerAlt}/>
            {this.props.children}
          </DetailBody>
        </Detail>
      </StyledItem>
    )
  }
}

export class EducationItem extends React.Component {
  static propTypes = {
    gpa: PropTypes.string, // TODO: Change to Numeric Value
    description: PropTypes.string,
    minor: PropTypes.string,
    concentration: PropTypes.string,
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sub_title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }
  render() {
    return (
      <Item
        logo={this.props.logo}
        title={this.props.title}
        sub_title={this.props.sub_title}
        location={this.props.location}
      >
        {this.props.gpa && <IconizedText text={this.props.gpa} icon={faGraduationCap}/>}
        {this.props.description && <Description>{this.props.description}</Description>}
        {this.props.minor && <IconizedText text={this.props.minor} icon={faBookOpen}/>}
        {this.props.concentration && <IconizedText text={this.props.concentration} icon={faBookOpen}/>}
      </Item>
    )
  }
}

export class ExperienceItem extends React.Component {
  static propTypes = {
    gpa: PropTypes.string, // TODO: Change to Numeric Value
    description: PropTypes.string,
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sub_title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }
  render() {
    return (
      <Item
        logo={this.props.logo}
        title={this.props.title}
        sub_title={this.props.sub_title}
        location={this.props.location}
      >
        {this.props.description && <Description>{this.props.description}</Description>}
      </Item>
    )
  }
}
