import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { closeSidebarAction } from "actions";

const SideBarButton = ({ closeSidebar, ...props }) => {  // eslint-disable-line
  if (props.external) {
    return (
      <a className="sidebar-button" href={props.url} rel="noopener noreferrer" target="_blank">
        <div className="icon-container">
          <FontAwesomeIcon icon={props.icon} />
        </div>
        <div className="text">
          {props.label}
        </div>
      </a>
    )
  }
  return (
    <Link className="sidebar-button" onClick={closeSidebar} to={props.url}>
      <div className="icon-container">
        <FontAwesomeIcon icon={props.icon} />
      </div>
      <div className="text">
        {props.label}
      </div>
    </Link>
  )
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  closeSidebar: () => closeSidebarAction(),
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarButton);

