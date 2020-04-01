import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

import Item from 'components/item'

import Header, { Description } from './header'


class CommentItem extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    date_created: PropTypes.string.isRequired,
  }
  render() {
    return (
        <Item>
          <Header
            title={this.props.name}
            descriptions={[this.props.comment]}
            items={[
              {
                  id: 'date_created',
                  text: this.props.date_created,
                  icon: faCalendarAlt
              },
            ]}
          />
        </Item>
    )
  }
}

export default CommentItem;
