import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore'

import { isImageFile } from 'utils'
import { getProject } from 'services'
import { Item } from './base'
import Header from './header'


const ProjectFilesContainer = styled.div`

`;

class ProjectImage extends React.Component {
  render() {
    return (
      <p> TEST </p>
    )
  }
}


class ProjectFiles extends React.Component {
  static defaultProps = {
    files: []
  }
  static propTypes = {
    files: PropTypes.array.isRequired
  }
  render() {
    return (
      <ProjectFilesContainer>
        {this.props.files.map((file) => {
          return <ProjectImage />
        })}
      </ProjectFilesContainer>
    )
  }
}

class ProjectItem extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    short_description: PropTypes.string.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
        loaded: false,
        description: null,
        name: null,
        files: [],
    }
  }
  componentWillMount() {
    this.getProject()
  }
  getProject() {
    var self = this
    getProject(this.props.id).then((response) => {
      // TODO: Should we only include projects that have files?  Or should we
      // assume that the display_alone flag would be set to false in the admin
      // for projects that did not have appropriate files for display?
      const files = _.filter(response.files, (file) => {
        return isImageFile(file.file)
      })
      self.setState({
          name: response.name,
          description: response.long_description,
          files: files,
          loaded: true,
      })
    }).catch((error) => {
      console.error(`There was an error loading project ${this.props.id}.`)
    })
  }
  render() {
    // NOTE: We already have the name from the props, but this will give us an
    // indication if the project has loaded.  We need to get the full project for
    // the files, based on the current API design.
    if (this.state.loaded) {
      return (
        <Item maxWidth={"1200px"}>
          <Header
            title={this.state.name}
            descriptions={[this.state.description]}
          />
          <ProjectFiles
            files={this.state.files}
          />
        </Item>
      )
    }
    // TODO: Come up with better loading display.
    else {
      return <p> Loading... </p>
    }
  }
}

export default ProjectItem;
