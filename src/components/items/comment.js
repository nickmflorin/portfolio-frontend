import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

import IconizedText from 'components/icons'

import Item from './base'

import './items.sass'


class Comment extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    date_created: PropTypes.string.isRequired,
  }

  render() {
    return (
        <Item>
          <div className='header' style={{display: "inline-block"}}>
            <h3 className='title'>{this.props.name}</h3>
            <div className='header-items'>
              <div className='header-item'>
                <IconizedText
                  text={this.props.date_created}
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
