import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { faHammer } from '@fortawesome/free-solid-svg-icons'

import { IconizedText } from 'components/icons'
import { FileLink } from 'components/buttons'
import { getProject } from 'services'
import { getFileExtension } from 'utils'


const ProjectName = styled.p`
  font-family: ${props => props.theme.fonts.opensans};
  font-weight: ${props => props.theme.fontweights.regular};
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 8px;
`;

const ProjectDescription = styled.p`
  font-family: ${props => props.theme.fonts.roboto};
  font-weight: ${props => props.theme.fontweights.light};
  color: ${props => props.theme.colors.text3};
  margin-bottom: 10px;
`;

const ProjectLinks = styled.div`

`;

const StyledProject = styled.div`
  margin-bottom: 10px;
`;

const StyledProjects = styled.div`
  margin-bottom: 20px;
`;


class Project extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {files: []}
  }
  componentWillMount() {
    this.getProjectFiles()
  }
  getProjectFiles() {
    // TODO: We only need this API call to get the PDF files associated with
    // the project.  Ideally, we want the projects attached with a given education
    // or experience to maybe only return the id and name.
    var self = this
    getProject(this.props.id).then((response) => {
      var files = []
      for(var i=0; i<response.files.length; i++){
        var filename = response.files[i].file
        var extension = getFileExtension(filename)
        if(extension == 'pdf'){
          files.push(response.files[i])
        }
      }
      this.setState({files: files})
    }).catch((error) => {
      console.log(`There was an error retrieving project ${this.props.id}.`)
    })
  }
  render() {
    return (
      <StyledProject>
        <ProjectName>{this.props.name}</ProjectName>
        <ProjectDescription>{this.props.short_description}</ProjectDescription>
        <ProjectLinks>
          {this.state.files.map((file) => {
            return <FileLink key={file.id} label={file.name} url={file.file} />
          })}
        </ProjectLinks>
      </StyledProject>
    )
  }
}

class Projects extends React.Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
  }
  render(){
    return (
      <StyledProjects>
        <IconizedText size={14} text={"Projects"} icon={faHammer} marginBottom={12}/>
        {this.props.projects.map((project, index) => {
          return <Project key={index} {...project} />
        })}
      </StyledProjects>
    )
  }
}

export default Projects;
