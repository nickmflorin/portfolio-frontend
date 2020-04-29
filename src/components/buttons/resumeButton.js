import React from "react";
import { connect } from "react-redux";

import { generateResumeAction } from 'actions'

const ResumeButton = (props) => (
  <a className="navbar-button" onClick={props.generateResume}>
    Resume
  </a>
)

const mapStateToProps = () => {}

const mapDispatchToProps = {
  generateResume: () => generateResumeAction(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ResumeButton);

