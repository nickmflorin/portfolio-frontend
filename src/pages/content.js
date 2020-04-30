import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import _ from "underscore";
import { pick } from "lodash";

const AppContent = (props) => (
  <div className="content">
    {_.map(props.navbar.items, (item) => {
      const PageComponent = item.page
      return (
        <Route
          exact key={item.id}
          path={item.url}
          render={(pps) => (
            <PageComponent
              onPageAreaClick={props.onPageAreaClick}
              {...pps}
            />
          )}
        />
      )
    })}
  </div>
)

const mapStateToProps = state => pick(state, ['navbar'])

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);
