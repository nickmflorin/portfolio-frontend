import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore'

import { getProject } from 'services'
import { isImageFile } from 'utils'

import { Item } from '../base'
import { Body, Descriptions, Description, Title } from '../common'
import ProjectFile from './file'


const ProjectTitle = styled(Title)`
  text-align: center;
`;

const ProjectFilesContainer = styled.div`
  display: inline-block;
  margin-top: 15px;
`;

class Project extends React.Component {
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
      })
    }).catch((error) => {
      console.error(`There was an error loading project ${this.props.id}.`)
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  render() {
    return (
        <Item id={`project-${this.props.id}`} loading={this.state.loading} maxWidth="1200px" padding="20px 100px">
          <ProjectTitle>{this.props.name}</ProjectTitle>
          <Body>
            <Descriptions>
              <Description>{this.props.short_description}</Description>
            </Descriptions>
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
          </Body>
        </Item>
    )
  }
}

export default Project;
