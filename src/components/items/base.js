import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react'

var classNames = require('classnames');


const Item = (props) => {
  return (
    <div className={classNames('item', props.className)}>
      <Loader size="mini" active={props.loading}/>
      {props.children}
    </div>
  )
}

export default Item;
