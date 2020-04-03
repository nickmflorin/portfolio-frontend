import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CommentItem, ItemsContainer } from 'components/items'


class Comments extends React.Component {
  render(){
    return (
      <ItemsContainer>
        {this.props.comments.map((comment) => {
          return (
            <CommentItem key={comment.id}
              id={comment.id}
              name={comment.name}
              date_created={comment.date_created}
              comment={comment.comment}
            />
          )
        })}
      </ItemsContainer>
    )
  }
}

export default Comments;
