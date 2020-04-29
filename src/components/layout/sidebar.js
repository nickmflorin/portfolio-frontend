import React from 'react';
import { connect } from "react-redux";
import { pick } from "lodash";

import { SideBarButton, SideBarResumeButton } from 'components/buttons'
import './sidebar.sass'

var classNames = require('classnames')

const SideBar = (props) => (
  <div className={classNames('sidebar', props.sidebar ? 'visible' : 'invisible')}>
    {props.navbar.items.map((item) => {
      return (
        <div className="button-container" key={item.id}>
          <SideBarButton
            icon={item.icon}
            label={item.label}
            url={item.url}
          />
        </div>
      )
    })}
    <div className="button-container">
      <SideBarResumeButton/>
    </div>
  </div>
)


const mapStateToProps = state => pick(state, ['sidebar', 'navbar'])

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
