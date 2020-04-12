import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore'

import { getProject } from 'services'
import { isImageFile, onImageLoadError } from 'utils'

import Tags from 'components/tags'
import ErrorBoundary from 'components/errorBoundary'

import { HtmlDescription, HtmlCaption } from 'components/html'
import { Panel } from 'components/panels'

import PageItem from './pageItem'

import './items.sass'


class ProjectFile extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string,
    file: PropTypes.string.isRequired,
    caption: PropTypes.string,
  }
  render() {
    return (
      <div className="file">
        {this.props.description && (
          <HtmlDescription>{this.props.description}</HtmlDescription>
        )}
        <div className="image-container">
          <img alt="Cannot Load" onError={onImageLoadError} src={this.props.file}/>
        </div>
        {this.props.caption && (
          <HtmlCaption>{this.props.caption}</HtmlCaption>
        )}
      </div>
    )
  }
}

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
          <PageItem.Body className="project">
            <Panel>
              <HtmlDescription>{this.state.showcase_description}</HtmlDescription>
            </Panel>
            {(this.state.skills.length !== 0) && (
              <ErrorBoundary>
                <Panel>
                  <Tags items={_.pluck(this.state.skills, 'name')} />
                </Panel>
              </ErrorBoundary>
            )}
            <div className="files-container">
              {this.state.files.map((file, index) => {
                return (
                  <ErrorBoundary key={index}>
                    <ProjectFile
                      caption={file.caption}
                      description={file.description}
                      file={file.file}
                      id={file.id}
                      key={index}
                    />
                  </ErrorBoundary>
                )
              })}
            </div>
          </PageItem.Body>
        </PageItem>
    )
  }
}

export default Project;
