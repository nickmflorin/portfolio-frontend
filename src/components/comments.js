import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CommentItem } from 'components/items'


class Comments extends React.Component {
  render(){
    return (
      <div>
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
      </div>
    )
  }
}

export default Comments;
