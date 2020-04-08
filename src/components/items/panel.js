import React from 'react';
import PropTypes from 'prop-types';
import { IconizedHeader } from 'components/icons'


const Panel = (props) => {
  var child = <div className="panel-item">{props.children}</div>
  if (props.children && props.children.constructor === Array){
    child = props.children.map((cl) => {
      if (cl) {
        return <div className="panel-item">{cl}</div>
      }
    })
  }
  return (
    <div className="panel">
      {props.header && (
        <IconizedHeader icon={props.icon}>{props.header}</IconizedHeader>
      )}
      {child}
    </div>
  )
}

export default Panel;
