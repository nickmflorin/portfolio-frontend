import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { pixelfy } from 'utils'
import { getProfile } from 'services'
import { NavBarButton, SideNavBarButton, LogoButton, MenuButton } from './buttons'

import './nav.sass'

var classNames = require('classNames')


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
      <div className={this.props.overlay ? classNames('navbar', 'overlay') : classNames('navbar')}>
        <div className='left'>
          <LogoButton to="/" />
        </div>
        <div className='right'>
          <div className='buttons'>
            {this.props.items.map((item) => {
              return (
                <div className='button-container' key={item.id}>
                  <NavBarButton
                    url={item.link}
                    label={item.label}
                  />
                </div>
              )
            })}
            <div className='button-container'>
              <NavBarButton
                url={this.state.resume_url}
                label={"Resume"}
                external={true}
              />
            </div>
          </div>
          <div className='button-container menu'>
            <MenuButton onClick={this.props.onMenuClick}/>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
