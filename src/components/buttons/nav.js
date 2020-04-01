import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// TODO: Figure out how to use one declaration of these styles.
const StyledInternalLink = styled(Link)`
  font-size: 1em;
  padding: 6px 8px;
  line-height: 18px;
  border: ${props => props.theme.borders.white};
  border-radius: 4px !important;
  width: 100%;
  margin: 0 auto;
  text-transform: uppercase;

  background: transparent;
  color: ${props => props.theme.colors.white};

  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.textgray1};
  }
`;

const StyledExternalLink = styled.a`
  font-size: 1em;
  padding: 6px 8px;
  line-height: 18px;
  border: ${props => props.theme.borders.white};
  border-radius: 4px !important;
  width: 100%;
  margin: 0 auto;
  text-transform: uppercase;

  background: transparent;
  color: ${props => props.theme.colors.white};
  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
  }
`;

export class NavBarInternalLink extends React.Component {
  render(){
    return (
      <StyledInternalLink to={this.props.url} >
        {this.props.label}
      </StyledInternalLink>
    )
  }
}

export class NavBarExternalLink extends React.Component {
  render(){
    return (
      <StyledExternalLink href={this.props.url} >
        {this.props.label}
      </StyledExternalLink>
    )
  }
}
