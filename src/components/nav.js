import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { NavBarButton, SideNavBarButton, LogoButton, MenuButton } from './buttons'

import './nav.sass'

var classNames = require('classNames')


class NavBar extends React.Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    onMenuClick: PropTypes.func.isRequired,
    onHomeClick: PropTypes.func.isRequired,
  }
  render() {
    return (
      <div className={this.props.overlay ? classNames('navbar', 'overlay') : classNames('navbar')}>
        <div className='left'>
          <LogoButton to="/" onClick={this.props.onHomeClick}/>
        </div>
        <div className='right'>
          <div className='buttons'>
            {this.props.items.map((item) => {
              return (
                <div className='button-container' key={item.id}>
                  <NavBarButton
                    url={item.url}
                    label={item.label}
                    external={item.external}
                    icon={item.icon}
                  />
                </div>
              )
            })}
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
