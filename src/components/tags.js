import React from 'react';
import PropTypes from 'prop-types';

import styled, { withTheme } from 'styled-components';
import { faMapPin, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

import IconizedText from 'components/icons'


const TagName = styled.p`
  font-family: ${props => (props.fontFamily || props.theme.fonts.roboto)};
  font-size: ${props => (`${props.size}px`)};
  line-height: ${props => (`${props.size + 2}px`)};
  font-weight: ${props => (props.fontWeight || props.theme.fontweights.regular)};
  color: ${props => (props.color || props.theme.colors.white)};
`;

const TagContainer = styled.div`
  background-color: ${props => props.color || props.theme.colors.blue};
  border: ${props => `1px solid ${props.color || props.theme.colors.blue}`};
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
        <TagName size={this.props.size}>{this.props.children}</TagName>
      </TagContainer>
    )
  }
}

export class Tags extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    size: PropTypes.number.isRequired
  }
  render(){
    return (
      <TagsContainer>
        {this.props.items.map((item, index) => {
          return <Tag key={index} size={this.props.size}>{item}</Tag>
        })}
      </TagsContainer>
    )
  }
}
