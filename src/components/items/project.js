import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore'

import { getProject } from 'services'
import { isImageFile } from 'utils'

import { HtmlDescription } from 'components/html'

import Tags from 'components/tags'
import PageItem from './base'
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
        <PageItem
          className="project"
          id={`project-${this.props.id}`}
          loading={this.state.loading}
        >
          <h1 className="thick">{this.props.name}</h1>
          <div className="body project">
            <Panel>
              <HtmlDescription>{this.state.showcase_description}</HtmlDescription>
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
                    description={file.description}
                    file={file.file}
                    id={file.id}
                    key={index}
                  />
                )
              })}
            </div>
          </div>
        </PageItem>
    )
  }
}

export default Project;
