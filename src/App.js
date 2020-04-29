import React from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';
import { HashRouter, Switch, Route} from 'react-router-dom';

import { Loader } from 'semantic-ui-react';

import AppContent from 'pages/content';
import { NavBar, SideBar, Footer } from 'components/layout';


const AppHeader = (props) => (
  <header>
    <SideBar/>
    <Switch>
      <Route exact path="/">
        <NavBar/>
      </Route>
      <Route>
        <NavBar overlay/>
      </Route>
    </Switch>
  </header>
)

const App = (props) => (
  <HashRouter>
    <div className="app">
      <Loader active={props.loading} style={{position: 'fixed'}}/>
      <AppHeader/>
      <AppContent/>
      <Footer />
    </div>
  </HashRouter>
)

const mapStateToProps = state => pick(state, ['loading'])

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
