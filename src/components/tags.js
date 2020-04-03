import React from 'react';
import PropTypes from 'prop-types';

import styled, { withTheme } from 'styled-components';
import { faMapPin, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

import IconizedText from 'components/icons'


const TagName = styled.p`
  font-family: ${props => (props.fontFamily || props.theme.fonts.roboto)};
  font-weight: ${props => (props.fontWeight || props.theme.fontweights.regular)};
  color: ${props => (props.color || props.theme.colors.white)};

  font-size: 10px;
  line-height: 12px;

  @media screen and (min-width: ${props => props.theme.responsive.breakSmall}){
    font-size: 11px;
    line-height: 13px;
  }

  @media screen and (min-width: ${props => props.theme.responsive.breakMedium}){
    font-size: 12px;
    line-height: 14px;
  }

  @media screen and (min-width: ${props => props.theme.responsive.breakLarge}){
    font-size: 13px;
    line-height: 15px;
  }
`;

const TagContainer = styled.div`
  background-color: ${props => props.color || props.theme.colors.blue};
  border: ${props => (props.color ? `1px solid ${props.color}` : props.theme.borders.blue)};
  border-radius: 8px;
  display: inline-block;
  flex-wrap: wrap;
  margin-right: 3px;
  margin-bottom: 3px;
  padding: 6px 8px;
`;

const TagsContainer = styled.div`
  display: inline-block;
`;


class Tag extends React.Component {
  render() {
    return (
      <TagContainer color={this.props.color}>
        <TagName>{this.props.children}</TagName>
      </TagContainer>
    )
  }
}

class Tags extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  }
  render(){
    return (
      <TagsContainer>
        {this.props.items.map((item, index) => {
          return <Tag key={index}>{item}</Tag>
        })}
      </TagsContainer>
    )
  }
}

export default Tags;
