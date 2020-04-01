import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getComments } from 'services'
import { LandingCommentForm } from 'components/forms'
import { CommentItem } from 'components/items'


const CommentsContainer = styled.div`

`;


const RequestForComment = styled.h3`
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  margin-bottom: 28px;
  font-size: 14px;
  color: ${props => props.theme.colors.textsecondary};
`;



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
      <CommentsContainer>
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
        <RequestForComment>Feel free to drop a note, comment or question!</RequestForComment>
        <LandingCommentForm />
      </CommentsContainer>
    )
  }
}

export default Comments;
