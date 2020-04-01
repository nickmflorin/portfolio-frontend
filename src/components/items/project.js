import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore'

import { isImageFile } from 'utils'
import { getProject } from 'services'

import { ComponentSpinner } from 'components/spinner'
import { StyledItem } from './base'
import Header, { Description } from './header'


export const StyledProjectItem = styled(StyledItem)`
  display: inline-block;
  max-width: 1200px;
  padding: 20px 100px;
  position: relative;
`;

const ProjectFilesContainer = styled.div`
  display: inline-block;
  margin-top: 15px;
`;

const ProjectFileContainer = styled.div`
  margin-bottom: 20px;
`;

const ProjectImage = styled.img`
  max-width: 100%;
  margin-bottom: 8px;
  border: ${props => (props.theme.borders.light)}
`;

const FileDescription = styled(Description)`
  margin-bottom: 15px;
`;

const FileCaption = styled(FileDescription)`
  font-size: 12px;
  color: ${props => (props.theme.colors.textgray1)}
`;



class ProjectFile extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
  }
  render() {
    return (
      <ProjectFileContainer>
        <FileDescription> {this.props.description} </FileDescription>
        <ProjectImage src={this.props.file}/>
        <FileCaption> {this.props.caption} </FileCaption>
      </ProjectFileContainer>
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
        loading: true,
        files: [],
    }
  }
  componentWillMount() {
    this.getProject()
  }
  getProject() {
    var self = this
    getProject(this.props.id).then((response) => {
      const files = _.filter(response.files, (file) => {
        return isImageFile(file.file)
      })
      self.setState({
          description: response.long_description,
          files: files,
          loading: false,
      })
    }).catch((error) => {
      console.error(`There was an error loading project ${this.props.id}.`)
    })
  }
  render() {
    return (
        <StyledProjectItem id={`project-${this.props.id}`}>
          <ComponentSpinner loading={this.state.loading} />
          <Header
            title={this.props.name}
            descriptions={[this.state.description]}
          />
          <ProjectFilesContainer>
            {this.state.files.map((file) => {
              return (
                <ProjectFile
                  id={file.id}
                  key={file.id}
                  file={file.file}
                  caption={file.caption}
                  description={file.description}
                />
              )
            })}
          </ProjectFilesContainer>
        </StyledProjectItem>
    )
  }
}

export default ProjectItem;
