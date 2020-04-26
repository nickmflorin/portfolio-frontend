import React from 'react';
import { connect } from "react-redux";
import { List } from 'semantic-ui-react'
import { HashLink } from 'react-router-hash-link';
import { pick } from "lodash";

import { EducationItem } from 'components/items'
import Page from './page'

import { fetchAllEducation } from 'actions'


class Education extends React.Component {

  componentDidMount() {
    this.props.fetchAllEducation()
  }

  render() {
    return (
      <Page {...this.props}>
        <Page.Content>
          <Page.Content.Left>
            <List className="accordion">
              {this.props.education.all.map((item) => (
                <List.Item key={item.id}>
                  <HashLink smooth to={`#education-${item.id}`}>{item.major}</HashLink>
                </List.Item>
              ))}
            </List>
          </Page.Content.Left>
          <Page.Content.Right>
            {this.props.education.all.map((item) => {
              return <EducationItem id={item.id} key={item.id} />
            })}
          </Page.Content.Right>
        </Page.Content>
      </Page>
    )
  }
}

const mapStateToProps = state => pick(state, ['education'])

const mapDispatchToProps = {
  fetchAllEducation: () => fetchAllEducation(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Education);
