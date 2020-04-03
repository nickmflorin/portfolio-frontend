import React from 'react';
import PropTypes from 'prop-types';

import styled, { withTheme } from 'styled-components';
import { faMapPin, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

import IconizedText from 'components/icons'

import './tags.sass'


class Tag extends React.Component {
  render() {
    return (
      <div color={this.props.color}>
        <p>{this.props.children}</p>
      </div>
    )
  }
}

class Tags extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  }
  render(){
    return (
      <div className='tags'>
        {this.props.items.map((item, index) => {
          return <Tag key={index}>{item}</Tag>
        })}
      </div>
    )
  }
}

export default Tags;
