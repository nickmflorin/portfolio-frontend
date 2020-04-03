import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getComments } from 'services'
import { CommentItem, ItemsContainer } from 'components/items'


class Comments extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      comments: [],
      loading: true,
    }
  }
  componentWillMount() {
    this.getComments()
  }
  getComments() {
    var self = this
    getComments().then((response) => {
      console.log(response)
      self.setState({comments: response})
    }).catch((error) => {
      console.error(`There was an error loading comments.`)
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  render(){
    // TODO: Build In Loading Wheel for API Request
    return (
      <ItemsContainer>
        {this.state.comments.map((comment) => {
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
