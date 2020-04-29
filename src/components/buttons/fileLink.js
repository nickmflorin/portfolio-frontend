import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

const FileLink = (props) => (  // eslint-disable-line
  <a className="file-link smaller" href={props.url} rel="noopener noreferrer" target="_blank">
    <div className="icon-container">
      <FontAwesomeIcon className="icon" icon={faFileDownload}/>
    </div>
    <div className="text">
      {props.label}
    </div>
  </a>
)

export default FileLink;
