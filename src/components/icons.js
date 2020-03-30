import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styled, { withTheme } from 'styled-components';


const StyledIconizedText = styled.p`
  margin-bottom: ${props => `${props.marginBottom || 0}px`};
`;

const StyledIconText = styled.span`
  font-family: ${props => (props.fontFamily || props.theme.fonts.roboto)};
  font-size: ${props => (`${props.size}px`)};
  line-height: ${props => (`${props.size + 2}px`)};
  font-weight: ${props => (props.fontWeight || props.theme.fontweights.regular)};
  color: ${props => (props.color || props.theme.colors.gray2)};
`;

const StyledIcon = styled.span`
  margin-right: ${props => props.side == 'left' ? '8px' : "0px"};
  margin-left: ${props => props.side == 'right' ? '8px' : "0px"};
  color: ${props => (props.color || props.theme.colors.gray2)};
  height: ${props => (`${props.size + 2}px`)};
  width: ${props => (`${props.size + 2}px`)};
  text-align: center;
`;


export class IconizedText extends React.Component {
  static defaultProps = {
    side: 'left'
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string,
    side: PropTypes.oneOf(['left', 'right']).isRequired,
  }
  render() {
    if(this.props.side == 'left') {
      return (
          <StyledIconizedText {...this.props}>
            <StyledIcon side={'left'} size={this.props.size} color={this.props.color}>
              <FontAwesomeIcon style={{'fontSize': `${this.props.size + 2}px`}} icon={this.props.icon} />
            </StyledIcon>
            <StyledIconText size={this.props.size} color={this.props.color}>
              {this.props.text}
            </StyledIconText>
          </StyledIconizedText>
      )
    }
    else {
      return (
          <StyledIconizedText {...this.props}>
            <StyledIconText size={this.props.size} color={this.props.color}>
              {this.props.text}
            </StyledIconText>
            <StyledIcon side={'right'} size={this.props.size} color={this.props.color}>
              <FontAwesomeIcon style={{'fontSize': `${this.props.size + 2}px`}} icon={this.props.icon} />
            </StyledIcon>
          </StyledIconizedText>
      )
    }
  }
}

const StyledIconLink = styled.a`
  color: ${props => (props.color || props.theme.colors.blue)};
`;

export class IconLink extends React.Component {
  static defaultProps = {
    style: {}
  }
  static propTypes = {
    style: PropTypes.object.isRequired,
    icon: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
  }
  render() {
    return (
      <StyledIconLink href={this.props.url}>
        <FontAwesomeIcon style={this.props.style} icon={this.props.icon} />
      </StyledIconLink>
    )
  }
}
