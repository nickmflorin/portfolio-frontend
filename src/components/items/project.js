import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import _ from 'underscore';
import { pick, isNil } from "lodash";

import { isImageFile } from 'utils';
import { fetchProjectIfNeeded } from 'actions';

import ErrorBoundary from 'components/errorBoundary';
import { Image } from 'components/image';
import { HtmlDescription, HtmlCaption } from 'components/html';

import { Panel, SkillsPanel } from './panels';
import PageItem from './pageItem';

import './items.sass';


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
          <Image src={this.props.file}/>
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

  componentDidMount() {
    this.props.fetchProject(this.props.id)
  }

  render() {
    const project = this.props.projects[this.props.id]
    if (isNil(project)) {
      return (
        <PageItem className="project" id={`project-${this.props.id}`}>
          <h1 className="thick">{this.props.name}</h1>
        </PageItem>
      )
    } else if (project.error) {
      return (
        <PageItem className="project" id={`project-${this.props.id}`}>
          <h1 className="thick">{this.props.name}</h1>
          <p>There was an error.</p>
        </PageItem>
      )
    } else {
      let files = _.sortBy(project.files, 'relative_order')
      files = _.filter(files, (file) => {
        return isImageFile(file.file)
      })
      return (
        <PageItem
          className="project"
          id={`project-${this.props.id}`}
        >
          <h1 className="thick">{this.props.name}</h1>
          <PageItem.Body className="project">
            <Panel>
              <HtmlDescription>{project.showcase_description}</HtmlDescription>
            </Panel>
            {(project.skills.length !== 0) && (
              <ErrorBoundary>
                <SkillsPanel skills={project.skills}/>
              </ErrorBoundary>
            )}
            <div className="files-container">
              {files.map((file, index) => {
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
}

const mapStateToProps = state => pick(state, ['projects'])

const mapDispatchToProps = {
  fetchProject: (id) => fetchProjectIfNeeded(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
