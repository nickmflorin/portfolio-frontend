import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Private_Button = styled(Link)`
  font-family: 'Roboto', sans-serif;
  padding: 0.5em 1em;
  font-size: 1.2em;

  border: 1px solid #FFFFFF;
  border-radius: 4px !important;
  background: white;
  color: blue;

  width: 100%;
  margin: 0 auto;

  text-transform: uppercase;
`;

class Button extends React.Component {
  render(){
    return (
      <Private_Button to={this.props.link} >
        {this.props.label}
      </Private_Button>
    )
  }
}

export default Button;
