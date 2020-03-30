import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// TODO: Figure out how to use one declaration of these styles.
const StyledInternalLink = styled(Link)`
  font-family: 'Roboto', sans-serif;

  font-size: 1em;
  padding: 6px 8px;
  line-height: 18px;

  border: 1px solid #FFFFFF;
  border-radius: 4px !important;
  background: transparent;
  color: #FFFFFF;

  width: 100%;
  margin: 0 auto;

  text-transform: uppercase;

  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.gray2};
  }
`;

const StyledExternalLink = styled.a`
  font-family: 'Roboto', sans-serif;

  font-size: 1em;
  padding: 6px 8px;
  line-height: 18px;

  border: 1px solid #FFFFFF;
  border-radius: 4px !important;
  background: transparent;
  color: #FFFFFF;

  width: 100%;
  margin: 0 auto;

  text-transform: uppercase;

  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.gray2};
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
    console.log(this.props.url)
    return (
      <StyledExternalLink href={this.props.url} >
        {this.props.label}
      </StyledExternalLink>
    )
  }
}
