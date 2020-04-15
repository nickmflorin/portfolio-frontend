import React from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

import { NavBarButton, BrandButton, MenuButton } from 'components/buttons'
import './nav.sass'

var classNames = require('classnames')


class NavBar extends React.Component {

  static propTypes = {
    items: PropTypes.array.isRequired,  // eslint-disable-line
    onMenuClick: PropTypes.func.isRequired,
    onHomeClick: PropTypes.func.isRequired,
  }
  render() {
    return (
      <div className={this.props.overlay ? classNames('navbar', 'overlay') : classNames('navbar')}>
        <div className="left">
          <BrandButton onClick={this.props.onHomeClick} to="/"/>
        </div>
        <div className="right">
          <div className="buttons">
            {this.props.items.map((item) => {
              return (
                <div className="button-container" key={item.id}>
                  <NavBarButton
                    icon={item.icon}
                    label={item.label}
                    location={this.props.location}
                    onClick={item.onClick}  // eslint-disable-line
                    url={item.url}
                  />
                </div>
              )
            })}
          </div>
          <div className="button-container menu">
            <MenuButton onClick={this.props.onMenuClick}/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
