import React from 'react';
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

import './headers.sass'


export const ProjectHeader = (props) => (
  <div className="project-header">
    <h6>{props.name}</h6>
    {props.showcase && (
      <Link className="project-link" to={`/projects#project-${props.id}`}>
        <FontAwesomeIcon className="icon" icon={faExternalLinkAlt}/>
      </Link>
    )}
  </div>
)
