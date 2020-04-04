import React from 'react';
import styled from 'styled-components';

import { getProfile, getComments, createComment } from 'services'

import { LandingPage } from 'pages/containers'
import { CommentForm } from 'components/forms'
import LandingBanner from 'components/banner'
import Comments from 'components/comments'

import './pages.sass'


class Landing extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        loading: true,
        submitting: false,
        comments: [],
        profile: {
          github_url: null,
          linkedin_url: null,
          intro: null,
          first_name: null,
          last_name: null,
          middle_name: null,
          headshot: null,
        }
    }
    this.commentForm = React.createRef();
  }
  componentWillMount() {
    this.getProfile()
    this.getComments()
  }
  getProfile() {
    var self = this
    getProfile().then((response) => {
      self.setState({
        profile: {
          github_url: response.github_url,
          linkedin_url: response.linkedin_url,
          intro: response.intro,
          first_name: response.first_name,
          last_name: response.last_name,
          middle_name: response.middle_name,
          headshot: response.headshot,
        }
      })
    }).catch((error) => {
      console.error('There was an error loading the resume.')
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  getComments() {
    var self = this
    getComments().then((response) => {
      self.setState({comments: response})
    }).catch((error) => {
      console.error(`There was an error loading comments.`)
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  render(){
    return (
      <LandingPage loading={this.state.submitting || this.state.loading}>
        <LandingBanner
          title={`${this.state.profile.first_name} ${this.state.profile.middle_name && this.state.profile.middle_name[0]}. ${this.state.profile.last_name}`}
          github_url={this.state.profile.github_url}
          linkedin_url={this.state.profile.linkedin_url}
          headshot={this.state.profile.headshot}
        />
        <div className='landing-container'>
          <div className='content'>
            <h3 className='intro'>{this.state.profile.intro}</h3>
            <div className="comments">
              <Comments comments={this.state.comments}/>
            </div>
            <CommentForm
              onSubmitted={this.getComments.bind(this)}
            />
          </div>
        </div>
      </LandingPage>
    )
  }
}

export default Landing;
