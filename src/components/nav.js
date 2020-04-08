import React from 'react';
import PropTypes from 'prop-types';

import { NavBarButton, BrandButton, MenuButton } from './buttons'

import './nav.sass'

var classNames = require('classnames')


class NavBar extends React.Component {

  static propTypes = {
    items: PropTypes.array.isRequired,  // eslint-disable-line
    onMenuClick: PropTypes.func.isRequired,
    onHomeClick: PropTypes.func.isRequired,
  }
  render() {
    return (
      <div className={this.props.overlay ? classNames('navbar', 'overlay') : classNames('navbar')}>
        <div className="left">
          <BrandButton onClick={this.props.onHomeClick} to="/"/>
        </div>
        <div className="right">
          <div className="buttons">
            {this.props.items.map((item) => {
              return (
                <div className="button-container" key={item.id}>
                  <NavBarButton
                    external={item.external}
                    icon={item.icon}
                    label={item.label}
                    url={item.url}
                  />
                </div>
              )
            })}
          </div>
          <div className="button-container menu">
            <MenuButton onClick={this.props.onMenuClick}/>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
