import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ComponentSpinner } from 'components/spinner'

var classNames = require('classnames');


class Item extends React.Component {
  render(){
    return (
      <div {...this.props} className={classNames('item', this.props.className)}>
        <ComponentSpinner show={this.props.loading || false} />
        {this.props.children}
      </div>
    )
  }
}

export default Item;
