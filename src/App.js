import React from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';
import { HashRouter, Switch, Route} from 'react-router-dom';
import _ from 'underscore';

import { Loader } from 'semantic-ui-react';

import { fetchProfileIfNeeded } from 'actions';
import { generateResume } from 'utils';

import { NavBar, SideBar, Footer } from 'components/layout';


const AppHeader = (props) => (
  <header>
    <SideBar
      items={props.items}
      onSideBarItemClick={props.onSideBarItemClick}
      ref={props.sidebar}
    />
    <Switch>
      <Route exact path="/">
        <NavBar
          items={props.items}
          onHomeClick={props.onHomeClick}
          onMenuClick={props.onMenuClick}
        />
      </Route>
      <Route>
        <NavBar
          items={props.items}
          onHomeClick={props.onHomeClick}
          onMenuClick={props.onMenuClick}
          overlay
        />
      </Route>
    </Switch>
  </header>
)

const AppContent = (props) => (
  <div className="content">
    {_.map(_.filter(props.items, (item) => (item.id !== 'resume')), (item) => {
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

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.sidebar = React.createRef();
  }

  // componentDidMount() {
  //   this.props.fetchProfile();
  // }

  onResumeClick(){
    this.isLoading(true)

    var self = this
    generateResume().then(() => {
      console.log('Resume successfully generated.')
    }).catch((error) => {
      console.error('There was an error generating the resume.')
    }).finally(() => {
      self.isLoading(false)
    })
  }

  onMenuClick(){
    this.sidebar.current.toggle()
  }

  onSideBarItemClick(){
    this.sidebar.current.hideIfShowing()
  }

  onHomeClick(){
    this.sidebar.current.hideIfShowing()
  }

  onPageAreaClick(){
    this.sidebar.current.hideIfShowing()
  }

  render() {
    return (
      <HashRouter>
        <div className="app">
          <Loader active={this.props.loading} style={{position: 'fixed'}}/>
          <AppHeader
            items={this.props.navbar.items}
            onHomeClick={this.onHomeClick.bind(this)}
            onMenuClick={this.onMenuClick.bind(this)}
            onSideBarItemClick={this.onSideBarItemClick.bind(this)}
            sidebar={this.sidebar}
          />
          <AppContent
            items={this.props.navbar.items}
            onPageAreaClick={() => {
              this.onPageAreaClick()
            }}
          />
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = state => pick(state, ['profile', 'navbar', 'loading'])

const mapDispatchToProps = {
  // fetchProfile: () => fetchProfileIfNeeded(),
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
