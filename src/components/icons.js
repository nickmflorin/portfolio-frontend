import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styled from 'styled-components';


const StyledIconizedText = styled.p`
  margin-bottom: ${props => `${props.marginBottom || 0}px`};
`;

const IconText = styled.span`
  font-family: ${props => (props.fontFamily || props.theme.fonts.roboto)};
  font-weight: ${props => (props.fontWeight || props.theme.fontweights.regular)};
  color: ${props => (props.color || props.theme.colors.textGray1)};

  font-size: ${props => (`${props.size - 2}px`)};
  line-height: ${props => (`${props.size}px`)};

  @media screen and (min-width: 768px){
    font-size: ${props => (`${props.size}px`)};
    line-height: ${props => (`${props.size + 2}px`)};
  }
`;

const IconContainer = styled.span`
  margin-right: 8px;
  color: ${props => (props.color || props.theme.colors.textGray1)};
  text-align: center;

  height: ${props => (`${props.size}px`)};
  width: ${props => (`${props.size}px`)};

  @media screen and (min-width: 768px){
    height: ${props => (`${props.size + 2}px`)};
    width: ${props => (`${props.size + 2}px`)};
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: ${props => (`${props.size - 2}px`)};
  line-height: ${props => (`${props.size}px`)};

  @media screen and (min-width: 768px){
    font-size: ${props => (`${props.size}px`)};
    line-height: ${props => (`${props.size + 2}px`)};
`;


class IconizedText extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string,
  }
  render() {
    return (
        <StyledIconizedText {...this.props}>
          <IconContainer size={this.props.size} color={this.props.color}>
            <Icon icon={this.props.icon} />
          </IconContainer>
          <IconText size={this.props.size} color={this.props.color}>
            {this.props.text}
          </IconText>
        </StyledIconizedText>
    )
  }
}

export default IconizedText;
