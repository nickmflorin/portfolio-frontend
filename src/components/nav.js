import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { pixelfy } from 'utils'
import { getProfile } from 'services'
import { NavBarButton, SideNavBarButton, LogoButton, MenuButton } from './buttons'


const NavBarContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: ${props => (props.overlay && props.theme.colors.navbar)};
`;

const NavBarLeftContainer = styled.div`
  flex-grow: 100;
  display: flex;
  padding-left: 6px;
`;

const NavBarRightContainer = styled.div`
  display: flex;
  padding-right: 6px;
`;

const NavBarButtonsContainer = styled.div`
  display: flex;

  @media screen and (max-width: ${props => props.theme.screenMax.tablet}){
    display: none !important;
  }
`;

const NavBarButtonContainer = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
`;

const MenuButtonContainer = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 9px;
  padding-bottom: 9px;

  @media screen and (min-width: ${props => props.theme.screenMin.laptopS}){
    display: none !important;
  }
`;

class NavBar extends React.Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    onMenuClick: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = { resume_url: null }
  }
  componentWillMount() {
    var self = this
    getProfile().then((response) => {
      self.setState({ resume_url: response.resume })
    }).catch((error) => {
      console.error('There was an error loading the resume.')
    })
  }
  render() {
    return (
      <NavBarContainer overlay={this.props.overlay}>
        <NavBarLeftContainer>
          <LogoButton to="/" />
        </NavBarLeftContainer>
        <NavBarRightContainer>
          <NavBarButtonsContainer>
            {this.props.items.map((item) => {
              return (
                <NavBarButtonContainer key={item.id}>
                  <NavBarButton
                    url={item.link}
                    label={item.label}
                  />
                </NavBarButtonContainer>
              )
            })}
            <NavBarButtonContainer>
              <NavBarButton
                url={this.state.resume_url}
                label={"Resume"}
                external={true}
              />
            </NavBarButtonContainer>
          </NavBarButtonsContainer>
          <MenuButtonContainer>
            <MenuButton onClick={this.props.onMenuClick}/>
          </MenuButtonContainer>
        </NavBarRightContainer>
      </NavBarContainer>
    );
  }
}

export default NavBar;
