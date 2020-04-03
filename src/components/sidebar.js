import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { pixelfy } from 'utils'
import { getProfile } from 'services'

import { SideBarButton } from './buttons'


const SideBarContainer = styled.div`
  height: ${props => (`calc(100vh - ${pixelfy(props.theme.heights.footer)} - ${pixelfy(props.theme.heights.header)})`)};
  position: fixed;
  right: ${props => props.visible ? pixelfy(0) : pixelfy(-1 * props.theme.widths.sidebar)};
  top: ${props => pixelfy(props.theme.heights.header)};
  width: ${props => pixelfy(props.theme.widths.sidebar)};
  background-color: ${props => props.theme.colors.navbar};
  transition-duration: 0.25s;
  border: ${props => props.theme.borders.white};

  @media screen and (min-width: ${props => props.theme.screenMin.laptopS}){
    display: none !important;
  }
`;

// FontAwesomeIcon size of 3x corresponds to about 42px height.
const SideBarButtonContainer = styled.div`
  position: relative;
  border-bottom: ${props => props.theme.borders.white};
  display: flex;
  flex-direction: column;
`;

class SideBar extends React.Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = { resume_url: null }
  }
  componentWillMount() {
    var self = this
    getProfile().then((response) => {
      self.setState({ resume_url: response.resume })
    }).catch((error) => {
      console.error('There was an error loading the resume.')
    })
  }
  render() {
    return (
      <SideBarContainer visible={this.props.visible}>
        {this.props.items.map((item) => {
          return (
            <SideBarButtonContainer key={item.id}>
              <SideBarButton
                url={item.link}
                label={item.label}
              />
            </SideBarButtonContainer>
          )
        })}
      </SideBarContainer>
    );
  }
}

export default SideBar;
