import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore'
import styled, { withTheme } from 'styled-components';

import { faMapPin, faCalendarAlt, faHammer, faFire } from '@fortawesome/free-solid-svg-icons'
import { IconizedText } from 'components/icons'
import ItemSkills from './skills'
import ItemProjects from './projects'


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

const DetailContainer = styled.div`
  padding: 12px;
  text-align: left;
  margin-top: 6px;
  display: inline-block;
`;

const Header = styled.div`
  display: inline-block;
  margin-bottom: 14px;
`;

const Title = styled.h3`
  margin-bottom: 8px;
`;

const SubTitle = styled.h5`
  margin-bottom: 8px;
`

const Descriptions = styled.div``;

const Description = styled.p`
  font-family: ${props => props.theme.fonts.roboto};
  font-weight: ${props => props.theme.fontweights.light};
  color: ${props => props.theme.colors.text3};
`;

const HeaderItems = styled.div`
  margin-bottom: 8px;
  display: flex;
`;

const HeaderItem = styled.div`
  margin-right: 12px;
`;


class ItemHeader extends React.Component {
  static defaultProps = {
    descriptions: [],
    items: [],
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    sub_title: PropTypes.string.isRequired,
    descriptions: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
  }
  render(){
    return (
      <Header>
        <Title>{this.props.title}</Title>
        <SubTitle>{this.props.sub_title}</SubTitle>
        {(this.props.descriptions.length != 0) && (
          <HeaderItems>
            {this.props.items.map((item) => {
              return (item.text &&
                <HeaderItem key={item.id}>
                  <IconizedText text={item.text} icon={item.icon} size={12} />
                </HeaderItem>
              )
            })}
          </HeaderItems>
        )}
        {(this.props.descriptions.length != 0) && (
          <Descriptions>
            {this.props.descriptions.map((desc, index) => {
              return <Description key={index}>{desc}</Description>
            })}
          </Descriptions>
        )}
      </Header>
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
          <DetailContainer>
            <ItemHeader {...this.props}/>
            {(this.props.skills.length != 0) && (
              <ItemProjects projects={this.props.projects} />
            )}
            {(this.props.skills.length != 0) && (
              <ItemSkills skills={this.props.skills} />
            )}
            {this.props.children}
          </DetailContainer>
        </StyledItem>
      </React.Fragment>
    )
  }
}

export default withTheme(Item);
