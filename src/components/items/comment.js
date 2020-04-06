import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

import IconizedText from 'components/icons'
import Item from './base'
import './items.sass'

var moment = require('moment');


class Comment extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    date_created: PropTypes.string.isRequired,
  }

  render() {
    const date = moment(this.props.date_created);
    if (!date.isValid()) {
      throw new Error('Invalid Date!')
    };
    const date_formatted = date.format('dddd, MMM Do YYYY');
    return (
        <Item className='bordered'>
          <div className='header' style={{display: "inline-block"}}>
            <h3 className='title'>{this.props.name}</h3>
            <div className='header-items'>
              <div className='header-item'>
                <IconizedText
                  text={date_formatted}
                  icon={faCalendarAlt}
                  size={12}
                />
              </div>
            </div>
          </div>
          <div className='descriptions'>
            <p>{this.props.comment}</p>
          </div>
        </Item>
    )
  }
}

export default Comment;
