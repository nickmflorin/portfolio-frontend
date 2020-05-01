import React from 'react';
import {connect} from "react-redux";
import {pick} from "lodash";

import { fetchProfile, fetchComments } from "actions";

import { CommentForm } from 'components/forms';
import { CommentItem } from 'components/items';
import { HtmlHeader } from 'components/html';
import Banner from 'components/landing/banner';

import Page from './page'

class Landing extends React.Component {

  componentDidMount() {
    this.props.fetchProfile()
    this.props.fetchComments()
  }

  render(){
    let title = null;
    if (this.props.profile &&
      this.props.profile.first_name &&
      this.props.profile.middle_name && this.props.profile.last_name) {
        title = `${this.props.profile.first_name} ${this.props.profile.middle_name && this.props.profile.middle_name[0]}. ${this.props.profile.last_name}`
    }
    return (
      <React.Fragment>
        <Banner
          github_url={this.props.profile.github_url}
          headshot={this.props.profile.headshot}
          linkedin_url={this.props.profile.linkedin_url}
          title={title}
        />
        <Page className="landing" {...this.props}>
          <HtmlHeader
            className="intro"
            tag="h3"
          >{this.props.profile.intro}
          </HtmlHeader>
          <div>
            {this.props.comments.all.map((comment) => {
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
          <CommentForm/>
        </Page>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => pick(state, ['profile', 'comments'])

const mapDispatchToProps = {
  fetchProfile: () => fetchProfile(),
  fetchComments: () => fetchComments(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
