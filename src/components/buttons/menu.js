import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


const StyledMenuButton = styled.a`

`;

const StyledMenuButtonImage = styled(FontAwesomeIcon)`
  color: ${props => props.theme.colors.white};
  line-height: 60px;
`;

class MenuButton extends React.Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

  render(){
    return (
      <StyledMenuButton onClick={this.props.onClick}>
        <StyledMenuButtonImage size="3x" icon={faBars}/>
      </StyledMenuButton>
    )
  }
}

export default MenuButton;
