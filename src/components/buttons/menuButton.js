import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { toggleSidebarAction } from 'actions'

const MenuButton = (props) => (  // eslint-disable-line
  <a className="menu-button" onClick={props.toggleSidebar}>
    <FontAwesomeIcon className="icon" icon={faBars} size="3x"/>
  </a>
)

const mapStateToProps = () => {};

const mapDispatchToProps = {
  toggleSidebar: () => toggleSidebarAction(),
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton);
