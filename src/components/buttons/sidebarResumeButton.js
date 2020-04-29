import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

import { closeSidebarAction, generateResumeAction } from "actions";

const SideBarResumeButton = (props) => {

  const onClick = () => {
    props.closeSidebar()
    props.generateResume()
  }

  return (
    <a className="sidebar-button" onClick={onClick}>
      <div className="icon-container">
        <FontAwesomeIcon icon={faFilePdf}/>
      </div>
      <div className="text">
        {"Resume"}
      </div>
    </a>
  )
}

const mapStateToProps = () => {}

const mapDispatchToProps = {
  generateResume: () => generateResumeAction(),
  closeSidebar: () => closeSidebarAction()
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarResumeButton);

