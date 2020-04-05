import React from 'react';
import { ComponentSpinner } from 'components/spinner'

var classNames = require('classnames');


const Item = (props) => {
  return (
    <div className={classNames('item', props.className)}>
      <ComponentSpinner show={props.loading || false} />
      {props.children}
    </div>
  )
}

export default Item;
