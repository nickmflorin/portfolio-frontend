import React from 'react';
import { Link } from 'react-router-dom';

import './nav.scss'

var classNames = require('classnames');


class NavBarItem extends React.Component {
  render() {
    return (
      <div className="nav-bar-button-container">
        <Link className="nav-bar-button" to={this.props.item.link} >
          {this.props.item.label}
        </Link>
      </div>
    )
  }
}

export class NavBar extends React.Component {
  render() {
    // TODO: We might want to deprecate this.
    const cls_names = classNames('nav-bar', {
        ['overlay']: this.props.overlay === true,
    });
    // TODO: Figure out how to set the logo in CSS so we can set it for different
    // resolutions.
    return (
      <div className={cls_names}>
        <div className="container-left">
          <Link to="/" className="nav-bar-logo">
          <div className="logo-container">
            <div className="logo-wrapper">
              <img className="logo" src="logo192.png" />
            </div>
          </div>
          </Link>
        </div>
        <div className="container-right">
          {this.props.items.map((item) => {
            return <NavBarItem key={item.id} item={item} />
          })}
        </div>
      </div>
    );
  }
}

export default NavBar;
