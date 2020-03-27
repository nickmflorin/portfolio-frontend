import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore'
import styled, { withTheme } from 'styled-components';

import { faMapPin, faCalendarAlt, faHammer, faFire } from '@fortawesome/free-solid-svg-icons'
import { IconizedText } from 'components/icons'
import { Tags } from 'components/tags'


const StyledItem = styled.div`
  display: flex;
  max-width: 800px;
  margin: 0px auto 20px auto;
  border: 1px solid #EFEFEF;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.white}
`;

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

const Title = styled.h3``;

const SubTitle = styled.h5`
  margin-bottom: 0px;
`

export const Description = styled.p``;

const Detail = styled.div`
  padding: 12px;
  text-align: left;
  margin-top: 6px;
  display: inline-block;
`;

const DetailHeader = styled.div`
  margin-bottom: 8px;
  display: inline-block;
`;

const DetailBody = styled.div`
  margin-bottom: 14px;
  display: inline-block;
`;

const DetailItems = styled.div`
  margin-bottom: 12px;
  display: flex;
`;

const DetailItem = styled.div`
  margin-right: 12px;
`;

const ProjectName = styled.p`
  font-family: ${props => props.theme.fonts.opensans};
  font-weight: ${props => props.theme.fontweights.regular};
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 8px;
`;

const ProjectDescription = styled.p`
  font-family: ${props => props.theme.fonts.roboto};
  font-weight: ${props => props.theme.fontweights.light};
  color: ${props => props.theme.colors.text3};
`;

class Project extends React.Component {
  render() {
    return (
      <div style={{marginBottom: 12}}>
        <ProjectName>{this.props.name}</ProjectName>
        <ProjectDescription>{this.props.description}</ProjectDescription>
      </div>
    )
  }
}


class Item extends React.Component {
  static defaultProps = {
    descriptions: [],
    projects: [],
    skills: [],
    items: [],
  }
  static propTypes = {
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sub_title: PropTypes.string.isRequired,
    descriptions: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
  }
  render() {
    // TODO: Create an icon for logos that could not be loaded.
    return (
      <React.Fragment>
        <StyledItem>
          <LogoContainer>
            <Logo alt="Could not Load" src={this.props.logo} />
          </LogoContainer>
          <Detail>
            <DetailHeader>
              <Title>{this.props.title}</Title>
              <SubTitle>{this.props.sub_title}</SubTitle>
            </DetailHeader>
            <DetailItems>
              {this.props.items.map((item) => {
                return (item.text &&
                  <DetailItem key={item.id}>
                    <IconizedText
                      text={item.text}
                      icon={item.icon}
                      size={12}
                    />
                  </DetailItem>
                )
              })}
            </DetailItems>
            {(this.props.descriptions.length != 0) && (
              <DetailBody>
                {this.props.descriptions.map((desc, index) => {
                  return <Description key={index}>{desc}</Description>
                })}
              </DetailBody>
            )}
            {(this.props.projects.length != 0) && (
              <div style={{display: 'inline-block'}}>
                <IconizedText size={14} text={"Projects"} icon={faHammer} marginBottom={12}/>
                {this.props.projects.map((project, index) => {
                  return <Project key={index} {...project} />
                })}
              </div>
            )}
            {(this.props.skills.length != 0) && (
              <div style={{marginBottom: 12}}>
                <IconizedText size={14} text={"Skills"} icon={faFire} marginBottom={12}/>
                <Tags size={14} items={_.pluck(this.props.skills, 'name')} />
              </div>
            )}
            {this.props.children}
          </Detail>
        </StyledItem>
      </React.Fragment>
    )
  }
}

export default withTheme(Item);
