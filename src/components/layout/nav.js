import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { pick } from "lodash";

import { NavBarButton, BrandButton, MenuButton, ResumeButton } from 'components/buttons'
import './nav.sass'

var classNames = require('classnames')

const NavBar = (props) => (
  <div className={props.overlay ? classNames('navbar', 'overlay') : classNames('navbar')}>
    <div className="left">
      <BrandButton to="/"/>
    </div>
    <div className="right">
      <div className="buttons">
        {props.navbar.items.map((item) => {
          return (
            <div className="button-container" key={item.id}>
              <NavBarButton
                icon={item.icon}
                label={item.label}
                location={props.location}
                onClick={item.onClick}  // eslint-disable-line
                url={item.url}
              />
            </div>
          )
        })}
        <div className="button-container">
          <ResumeButton/>
        </div>
      </div>
      <div className="button-container menu">
        <MenuButton/>
      </div>
    </div>
  </div>
)

const mapStateToProps = state => pick(state, ['navbar'])

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));

