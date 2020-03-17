import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import './nav.scss'

var classNames = require('classnames');


class NavBarItem extends Component {
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

export class NavBar extends Component {
  render() {
    const cls_names = classNames('nav-bar', {
        ['overlay']: this.props.overlay === true,
    });
    return (
      <div className={cls_names}>
        <div className="nav-left">
          <div className="nav-bar-logo-container">
            <Link to="/" className="nav-bar-logo">Nick Florin </Link>
          </div>
        </div>
        <div className="nav-right">
          {this.props.items.map((item) => {
            return <NavBarItem key={item.id} item={item} />
          })}
        </div>
      </div>
    );
  }
}

export default NavBar;
