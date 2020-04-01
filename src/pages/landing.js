import React from 'react';
import styled from 'styled-components';

import { getProfile } from 'services'

import { LandingPage } from 'pages/containers'
import { LandingBody, LandingBanner } from 'components/landing'


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
    }
  }
  componentWillMount() {
    this.getProfile()
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
  render(){
    return (
      <LandingPage loading={this.state.loading}>
        <LandingBanner
          title={`${this.state.first_name} ${this.state.middle_name && this.state.middle_name[0]}. ${this.state.last_name}`}
          github_url={this.state.github_url}
          linkedin_url={this.state.linkedin_url}
        />
        <LandingBody intro={this.state.intro} />
      </LandingPage>
    )
  }
}

export default Landing;
