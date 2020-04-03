import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

import IconizedText from 'components/icons'

import { Item } from './base'
import { Header, Descriptions, Description, HeaderItems, HeaderItem,
  Title } from './common'


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
          <Header style={{display: "inline-block"}}>
            <Title>{this.props.name}</Title>
            <HeaderItems>
              <HeaderItem>
                <IconizedText
                  text={this.props.date_created}
                  icon={faCalendarAlt}
                  size={12}
                />
              </HeaderItem>
            </HeaderItems>
          </Header>
          <Descriptions>
            <Description>{this.props.comment}</Description>
          </Descriptions>
        </Item>
    )
  }
}

export default Comment;
