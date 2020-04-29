import React from "react";
import { Link } from "react-router-dom";

var classNames = require('classnames')

const NavBarButton = (props) => {  // eslint-disable-line
  if (props.onClick) {
    return (
      <a
        className="navbar-button"
        onClick={props.onClick}
      >
        {props.label}
      </a>
    )
  }
  return (
    <Link
      className={props.location.pathname === props.url ? classNames('navbar-button', 'active') : 'navbar-button'}
      to={props.url}
    >
      {props.label}
    </Link>
  )
}

export default NavBarButton;
