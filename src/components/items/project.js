import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore'

import { getProject } from 'services'
import { isImageFile } from 'utils'

import Tags from 'components/tags'
import Item from './base'
import Panel from './panel'
import ProjectFile from './file'

import './items.sass'


class Project extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
        loading: true,
        showcase_description: null,
        skills: [],
        files: [],
    }
  }
  componentDidMount() {
    var self = this
    getProject(this.props.id).then((response) => {
      const files = _.filter(response.files, (file) => {
        return isImageFile(file.file)
      })
      self.setState({
          showcase_description: response.showcase_description,
          files: files,
          skills: response.skills,
      })
    }).catch((error) => {
      console.error(`There was an error loading project ${this.props.id}.`)
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  render() {
    return (
        <Item
          className="project"
          id={`project-${this.props.id}`}
          loading={this.state.loading}
        >
          <div className="header">
            <h2 className="title">{this.props.name}</h2>
          </div>
          <div className="body project">
            <Panel>
              <p>{this.state.showcase_description}</p>
            </Panel>
            {(this.state.skills.length !== 0) && (
              <Panel>
                <Tags items={_.pluck(this.state.skills, 'name')} />
              </Panel>
            )}
            <div className="files-container">
              {this.state.files.map((file, index) => {
                return (
                  <ProjectFile
                    caption={file.caption}
                    className="project"
                    description={file.description}
                    id={`project-${this.props.id}`}
                    key={index}
                    loading={this.state.loading}
                  />
                )
              })}
            </div>
          </div>
        </Item>
    )
  }
}

export default Project;
