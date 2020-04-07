import React from 'react';

import { getProfile, getComments } from 'services'

import { CommentForm } from 'components/forms'
import { CommentItem } from 'components/items'
import Banner from 'components/banner'

import { Page } from './page'

import './pages.sass'


class Landing extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        loading: true,
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
  }
  componentDidMount() {
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
      <div className='landing-page'>
        <Banner
          title={`${this.state.profile.first_name} ${this.state.profile.middle_name && this.state.profile.middle_name[0]}. ${this.state.profile.last_name}`}
          github_url={this.state.profile.github_url}
          linkedin_url={this.state.profile.linkedin_url}
          headshot={this.state.profile.headshot}
        />
        <Page style={{maxWidth: 720}}>
          <h3 className='intro'>{this.state.profile.intro}</h3>
          <div className="comments">
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
          </div>
          <CommentForm
            onSubmitted={this.getComments.bind(this)}
          />
        </Page>
      </div>
    )
  }
}

export default Landing;
