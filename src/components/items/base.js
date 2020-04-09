import React from 'react';
import { Loader } from 'semantic-ui-react'

var classNames = require('classnames');


const PageItem = (props) => {
  const {className, loading, children, ...otherProps} = props;
  return (
    <div className={classNames('page-item', className)} {...otherProps}>
      <Loader active={loading} size="mini"/>
      {children}
    </div>
  )
}

export default PageItem;
