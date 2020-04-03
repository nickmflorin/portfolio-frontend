import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'underscore'

import { getProject } from 'services'
import { isImageFile } from 'utils'

import { Item } from '../base'
import { Header, Body, Descriptions, Description, Title } from '../common'
import ProjectFile from './file'


const ProjectItem = styled(Item)`
  max-width: 1200px;
  padding: 15px 20px;

  @media screen and (min-width: ${props => props.theme.responsive.breakSmall}){
    padding: 20px 40px;
  }

  @media screen and (min-width: ${props => props.theme.responsive.breakMedium}){
    padding: 20px 100px;
  }
`;

const ProjectHeader = styled(Header)`
  text-align: center;
  display: flex;
  margin-bottom: 10px;

  @media screen and (min-width: ${props => props.theme.responsive.breakSmall}){
    margin-bottom: 12px;
  }

  @media screen and (min-width: ${props => props.theme.responsive.breakMedium}){
    margin-bottom: 14px;
  }
`;

const ProjectTitle = styled(Title)`
  text-align: center;
  margin-bottom: 0px;
`;

const ProjectBody = styled(Body)`
  margin-left: 0px !important;
`;

const ProjectFilesContainer = styled.div`
  display: inline-block;
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
        <ProjectItem
          id={`project-${this.props.id}`}
          loading={this.state.loading}
        >
          <ProjectHeader>
            <ProjectTitle>{this.props.name}</ProjectTitle>
          </ProjectHeader>
          <ProjectBody>
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
          </ProjectBody>
        </ProjectItem>
    )
  }
}

export default Project;
