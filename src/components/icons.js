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
  margin-right: 4px;
  color: ${props => (props.color || props.theme.colors.gray2)};
  height: ${props => (`${props.size + 2}px`)};
  width: ${props => (`${props.size + 2}px`)};
  text-align: center;
`;


export class IconizedText extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.object,
    size: PropTypes.number.isRequired,
    color: PropTypes.string,
  }
  render() {
    return (
        <StyledIconizedText {...this.props}>
          <StyledIcon>
            {this.props.icon && (
              <StyledIcon size={this.props.size} color={this.props.color}>
                <FontAwesomeIcon style={{'fontSize': `${this.props.size + 2}px`}} icon={this.props.icon} />
              </StyledIcon>
            )}
          </StyledIcon>
          <StyledIconText size={this.props.size} color={this.props.color}>
            {this.props.text}
          </StyledIconText>
        </StyledIconizedText>
    )
  }
}
