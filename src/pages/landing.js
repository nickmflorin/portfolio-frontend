import React from 'react';

import { getProfile, getComments } from 'services'

import { CommentForm } from 'components/forms'
import { CommentItem } from 'components/items'
import { HtmlHeader } from 'components/html'

import Banner from 'components/landing/banner'
import PoweredBy from 'components/landing/poweredBy'

import Page from './page'


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
      <React.Fragment>
        <Banner
          github_url={this.state.profile.github_url}
          headshot={this.state.profile.headshot}
          linkedin_url={this.state.profile.linkedin_url}
          title={`${this.state.profile.first_name} ${this.state.profile.middle_name && this.state.profile.middle_name[0]}. ${this.state.profile.last_name}`}
        />
        <Page className="landing">
          <PoweredBy/>
          <HtmlHeader
            className="intro"
            tag="h3"
          >{this.state.profile.intro}
          </HtmlHeader>
          <div className="comments">
            {this.state.comments.map((comment) => {
              return (
                <CommentItem comment={comment.comment}
                  date_created={comment.date_created}
                  id={comment.id}
                  key={comment.id}
                  name={comment.name}
                />
              )
            })}
          </div>
          <CommentForm
            onSubmitted={this.getComments.bind(this)}
          />
        </Page>
      </React.Fragment>
    )
  }
}

export default Landing;
