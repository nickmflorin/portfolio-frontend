import React from 'react';
import { Loader } from 'semantic-ui-react'

var classNames = require('classnames');


const Item = (props) => {
  return (
    <div className={classNames('item', props.className)}>
      <Loader active={this.props.loading} size="mini"/>
      {props.children}
    </div>
  )
}

export default Item;
