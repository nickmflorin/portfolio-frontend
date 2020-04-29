import React from 'react';
import { connect } from "react-redux";
import { List } from 'semantic-ui-react'
import { HashLink } from 'react-router-hash-link';
import { pick } from "lodash";

import { fetchAllExperience } from "actions";
import { ExperienceItem } from 'components/items'

import Page from './page'

class Experience extends React.Component {

  componentDidMount() {
    this.props.fetchAllExperience()
  }
  render() {
    return (
      <Page {...this.props}>
        <Page.Content>
          <Page.Content.Left>
            <List className="accordion">
              {this.props.experience.all.map((item) => (
                <List.Item key={item.id}>
                  <HashLink smooth to={`#experience-${item.id}`}>
                    {item.short_title || item.title}
                  </HashLink>
                </List.Item>
              ))}
            </List>
          </Page.Content.Left>
          <Page.Content.Right>
            {this.props.experience.all.map((item) => {
              return <ExperienceItem id={item.id} key={item.id} />
            })}
          </Page.Content.Right>
        </Page.Content>
      </Page>
    )
  }
}

const mapStateToProps = state => pick(state, ['experience'])

const mapDispatchToProps = {
  fetchAllExperience: () => fetchAllExperience(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Experience);
