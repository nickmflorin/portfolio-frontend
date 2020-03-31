import React from 'react';
import styled from 'styled-components';

import { getProfile } from 'services'
import { NavBarInternalLink, NavBarExternalLink, LogoButton } from './buttons'

var classNames = require('classnames');


const NavBarButtonContainer = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
`;


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


export class NavBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {resume_url: null}
  }
  componentWillMount() {
    this.getResumeLink()
  }
  getResumeLink() {
    var self = this
    getProfile().then((response) => {
      self.setState({resume_url: response.resume})
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
          {this.props.items.map((item) => {
            return (
              <NavBarButtonContainer key={item.id}>
                <NavBarInternalLink
                  url={item.link}
                  label={item.label}
                />
              </NavBarButtonContainer>
            )
          })}
          <NavBarButtonContainer>
            <NavBarExternalLink
              url={this.state.resume_url}
              label={"Resume"}
            />
          </NavBarButtonContainer>
        </NavBarRightContainer>
      </NavBarContainer>
    );
  }
}

export default NavBar;
