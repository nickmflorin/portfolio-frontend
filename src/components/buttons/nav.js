import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


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
    color: ${props => props.theme.colors.textGray1};
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

class NavBarButton extends React.Component {

  static propTypes = {
    // URL Cannot be Required Since We Are Populating with API Response for Resume URL
    url: PropTypes.string,
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

export default NavBarButton;
