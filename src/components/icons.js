import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styled from 'styled-components';


const StyledIconContainer = styled.div`
  height: ${props => (props.size || "18px")};
  width: ${props => (props.size || "18px")};
  margin-right: 8px;
  color: ${props => (props.color || props.theme.colors.gray1)};
  text-align: center;
`;

const StyledIconTextContainer = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

const StyledIconText = styled.p`
  font-family: ${props => (props.fontFamily || props.theme.fonts.opensans)}
  font-size: ${props => (props.fontSize || "14px")};
  lineHeight: ${props => (props.lineHeight || "14px")};
  font-weight: ${props => (props.fontWeight || props.theme.fontweights.light)};
  color: ${props => (props.color || props.theme.colors.gray1)};
`;

export class Icon extends React.Component {
  static propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.object.isRequired,
  }
  render() {
    const style = {
      'fontSize': this.props.size || "18px"
    }
    return (
      <StyledIconContainer size={this.props.size} color={this.props.color}>
        <FontAwesomeIcon style={style} icon={this.props.icon} />
      </StyledIconContainer>
    )
  }
}


export class IconizedText extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.object,
    iconSize: PropTypes.string,
    color: PropTypes.string,
  }
  render() {
    return (
      <StyledIconTextContainer>
        {this.props.icon && (
          <Icon
            icon={this.props.icon}
            color={this.props.color}
            size={this.props.iconSize}
          />
        )}
        <StyledIconText>{this.props.text}</StyledIconText>
      </StyledIconTextContainer>
    )
  }
}
