import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledInternalLink = styled(Link)`
  font-size: 1em;
  padding: 6px 8px;
  line-height: 18px;
  width: 100%;
  margin: 0 auto;
  text-transform: uppercase;
  background: transparent;
  color: ${props => props.theme.colors.white};
  text-align: center;

  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.textGray1};
  }
`;

const StyledExternalLink = styled.a`
  font-size: 1em;
  padding: 6px 8px;
  line-height: 18px;
  width: 100%;
  margin: 0 auto;
  text-transform: uppercase;
  background: transparent;
  color: ${props => props.theme.colors.white};
  text-align: center;

  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
  }
`;


class SideBarButton extends React.Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    external: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    external: false,
  }

  render(){
    if (this.props.external) {
      return (
        <StyledExternalLink href={this.props.url} >
          {this.props.label}
        </StyledExternalLink>
      )
    }
    return (
      <StyledInternalLink to={this.props.url} >
        {this.props.label}
      </StyledInternalLink>
    )
  }
}

export default SideBarButton;
