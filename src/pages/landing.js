import React from 'react';
import styled from 'styled-components';

import { getProfile, getComments, createComment } from 'services'

import { LandingPage } from 'pages/containers'
import { LandingCommentForm } from 'components/forms'
import LandingBanner from 'components/banner'
import Comments from 'components/comments'


const LandingBodyContainer = styled.div`
  position: relative;
  height: ${props => (`${100 - props.theme.heights.banner}vh`)};
  margin-top: ${props => (`${-1 * (props.theme.heights.banner)}vh`)};
  padding: 20px;
  max-height: ${props => (`calc(${props.theme.heights.banner}vh - ${props.theme.heights.footer})`)};
  overflow-y: scroll;
`;

const LandingBodyContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Intro = styled.h3`
  font-style: italic;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 400;
  line-height: 22px;
  font-size: 16px;
  margin-bottom: 32px;
  text-align: center;
`;

class Landing extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        github_url: null,
        linkedin_url: null,
        intro: null,
        first_name: null,
        last_name: null,
        middle_name: null,
        loading: true,
        submitting: false,
        comments: [],
    }
  }
  componentWillMount() {
    // TODO: Make these API Requests run at the same time.
    this.getProfile()
    this.getComments()
  }
  getProfile() {
    var self = this
    getProfile().then((response) => {
      self.setState({
          github_url: response.github_url,
          linkedin_url: response.linkedin_url,
          intro: response.intro,
          first_name: response.first_name,
          last_name: response.last_name,
          middle_name: response.middle_name,
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
  submitComment(values){
    var self = this
    self.setState({submitting: true})
    createComment(values).then((response) => {
      // Reload the Comments to Repopulate
      // TODO: Pop up success message in a modal (or error message in a modal).
      // TODO: Clear the form contents.
      self.getComments()
    }).catch((error) => {
      console.error('There was an error submitting the comment.')
    }).finally(() => {
      self.setState({submitting: false})
    })
  }
  render(){
    return (
      <LandingPage loading={this.state.submitting || this.state.loading}>
        <LandingBanner
          title={`${this.state.first_name} ${this.state.middle_name && this.state.middle_name[0]}. ${this.state.last_name}`}
          github_url={this.state.github_url}
          linkedin_url={this.state.linkedin_url}
        />
        <LandingBodyContainer>
          <LandingBodyContent>
            <Intro>{this.state.intro}</Intro>
            <div style={{marginBottom: "20px"}}>
              <Comments comments={this.state.comments}/>
            </div>
            <LandingCommentForm
              onSubmitComment={this.submitComment.bind(this)}
              loading={this.state.submitting}
            />
          </LandingBodyContent>
        </LandingBodyContainer>
      </LandingPage>
    )
  }
}

export default Landing;
