import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { faHammer } from '@fortawesome/free-solid-svg-icons'

import { getProject } from 'services'
import { getFileExtension } from 'utils'

import IconizedText from 'components/icons'
import { FileLink } from 'components/buttons'


const StyledProjects = styled.div``;

const StyledProject = styled.div`
  margin-bottom: 10px;
`;

const ProjectName = styled.p`
  font-family: ${props => props.theme.fonts.opensans};
  font-weight: ${props => props.theme.fontweights.regular};
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.textTertiary};
  margin-bottom: 6px;
  margin-top: 8px;
`;

const ProjectLinks = styled.div``;


class Project extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    short_description: PropTypes.string.isRequired,
    showcase: PropTypes.bool.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
        files: [],
        loading: true,
    }
  }
  componentWillMount() {
    this.getProjectFiles()
  }
  getProjectFiles() {
    /**
    * TODO: We only need this API call to get the PDF files associated with
      the project.  Ideally, we want the projects attached with a given education
      or experience to maybe only return the id and name.
    */
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
      self.setState({files: files})
    }).catch((error) => {
      console.error(`There was an error retrieving project ${this.props.id}.`)
    }).finally(() => {
      self.setState({loading: false})
    })
  }
  render() {
    // TODO: Include link icon next to text for project name if it has an associated
    // project showcased on the projects page.
    return (
      <StyledProject>
        <ProjectName className='smaller'>{this.props.name}</ProjectName>
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

export default Project;
