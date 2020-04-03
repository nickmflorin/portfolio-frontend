import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ComponentSpinner } from 'components/spinner'

var classNames = require('classnames');


export class Item extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    loading: false
  }
  render(){
    return (
      <div {...this.props} className={classNames('item', this.props.className)}>
        <ComponentSpinner show={this.props.loading} />
        {this.props.children}
      </div>
    )
  }
}
