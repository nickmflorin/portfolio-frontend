import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './nav.css'

const NavBarItems = [ 
  {'id' : 'about', 'label' : 'About Me', 'link' : '/about'},
  {'id' : 'resume', 'label' : 'Resume', 'link' : '/resume'},
  {'id' : 'work', 'label' : 'Work', 'link' : '/work'},
  {'id' : 'contact', 'label' : 'Contact', 'link' : '/contact'}
]

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

export class NavBarMini extends Component {
  render() {
    return (
      <div className="nav-bar-mini">
        <div className="nav-left">
          <div className="nav-bar-logo-container">
            <Link to="/" className="nav-bar-logo">Nick Florin </Link>
          </div>
        </div>
        <div className="nav-right">
          {NavBarItems.map((item) => {
            return <NavBarItem key={item.id} item={item} />
          })}
        </div>
      </div>
    );
  }
}

export class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <div className="nav-left">
          <div className="nav-bar-logo-container">
            <Link to="/" className="nav-bar-logo">Nick Florin </Link>
          </div>
        </div>
        <div className="nav-right">
          {NavBarItems.map((item) => {
            return <NavBarItem key={item.id} item={item} />
          })}
        </div>
      </div>
    );
  }
}

export default {NavBar, NavBarMini};