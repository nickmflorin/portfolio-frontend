import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const ProjectFileContainer = styled.div`
  margin-bottom: 20px;
`;

const ProjectImage = styled.img`
  max-width: 100%;
  margin-bottom: 8px;
  border: ${props => (props.theme.borders.light)}
`;

const FileDescription = styled.p`
  margin-bottom: 15px;
  font-family: ${props => props.theme.fonts.roboto};
  font-weight: ${props => props.theme.fontweights.light};
  color: ${props => props.theme.colors.textTertiary};
  margin-bottom: 8px;
`;

const FileCaption = styled(FileDescription)`
  font-size: 12px;
  color: ${props => (props.theme.colors.textGray1)}
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

export default ProjectFile;
