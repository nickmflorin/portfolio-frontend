import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styled from 'styled-components';


const IconText = styled.span`
  font-family: ${props => (props.fontFamily || props.theme.fonts.roboto)};
  font-weight: ${props => (props.fontWeight || props.theme.fontweights.regular)};
  color: ${props => (props.color || props.theme.colors.textGray1)};

  font-size: ${props => (props.size == 'large') ? "12px" : "10px"};
  line-height: ${props => (props.size == 'large') ? "12px" : "10px"};

  @media screen and (min-width: ${props => props.theme.responsive.breakSmall}){
    font-size: ${props => (props.size == 'large') ? "13px" : "11px"};
    line-height: ${props => (props.size == 'large') ? "13px" : "11px"};
  }

  @media screen and (min-width: ${props => props.theme.responsive.breakMedium}){
    font-size: ${props => (props.size == 'large') ? "14px" : "12px"};
    line-height: ${props => (props.size == 'large') ? "14px" : "12px"};
  }
`;

const IconContainer = styled.span`
  margin-right: 8px;
  color: ${props => (props.color || props.theme.colors.textGray1)};
  text-align: center;

  height: ${props => (props.size == 'large') ? "12px" : "10px"};
  width: ${props => (props.size == 'large') ? "12px" : "10px"};

  @media screen and (min-width: ${props => props.theme.responsive.breakSmall}){
    height: ${props => (props.size == 'large') ? "13px" : "11px"};
    width: ${props => (props.size == 'large') ? "13px" : "11px"};
  }

  @media screen and (min-width: ${props => props.theme.responsive.breakMedium}){
    height: ${props => (props.size == 'large') ? "14px" : "12px"};
    width: ${props => (props.size == 'large') ? "14px" : "12px"};
  }
`;

const Icon = styled(FontAwesomeIcon)`
  line-height: 10px;

  @media screen and (min-width: ${props => props.theme.responsive.breakSmall}){
    line-height: 12px;
  }

  @media screen and (min-width: ${props => props.theme.responsive.breakMedium}){
    line-height: ${props => (props.size == 'large') ? "14px" : "12px"};
  }
`;


class IconizedText extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    color: PropTypes.string,
  }
  render() {
    return (
        <p style={this.props.style}>
          <IconContainer size={this.props.size} color={this.props.color}>
            <Icon icon={this.props.icon} color={this.props.color}/>
          </IconContainer>
          <IconText size={this.props.size} color={this.props.color}>
            {this.props.text}
          </IconText>
        </p>
    )
  }
}

export default IconizedText;
