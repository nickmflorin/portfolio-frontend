import React from 'react';
import PropTypes from 'prop-types';

import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

import { IconizedText } from 'components/icons'

import PageItem from './pageItem'
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
        <PageItem>
          <div className="page-item-header" style={{display: "inline-block"}}>
            <h1 className="thick">{this.props.name}</h1>
            <div className="header-items">
              <div className="header-item">
                <IconizedText
                  icon={faCalendarAlt}
                  size={12}
                >{date_formatted}
                </IconizedText>
              </div>
            </div>
          </div>
          <div className="descriptions">
            <p>{this.props.comment}</p>
          </div>
        </PageItem>
    )
  }
}

export default Comment;
