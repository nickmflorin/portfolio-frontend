import React from 'react';
import { HashRouter, Switch, Route} from 'react-router-dom'
import update from 'react-addons-update';
import _ from 'underscore'

import { Loader } from 'semantic-ui-react'
import { faGraduationCap, faBriefcase, faHammer, faFilePdf, faHome
  } from '@fortawesome/free-solid-svg-icons'

import { getProfile } from 'services'

import { Landing, Projects, Experience, Education } from 'pages'
import { NavBar, SideBar, Footer } from 'components/layout'


const NavBarItems = [
  {
    id : 'home',
    label : 'Home',
    url : '/',
    external: false,
    icon: faHome,
    page: Landing,
  },
  {
    id : 'experience',
    label : 'Experience',
    url : '/experience',
    external: false,
    icon: faBriefcase,
    page: Experience,
  },
  {
    id : 'education',
    label : 'Education',
    url : '/education',
    external: false,
    icon: faGraduationCap,
    page: Education,
  },
  {
    id : 'projects',
    label : 'Projects',
    url : '/projects',
    external: false,
    icon: faHammer,
    page: Projects,
  },
  {
    id: 'resume',
    label: 'Resume',
    external: true,
    icon: faFilePdf,
  }
]

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
          render={(props) => (
            <PageComponent
              onPageAreaClick={props.onPageAreaClick}
              {...props}
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
    this.state = { items: NavBarItems }
  }
  componentDidMount() {
    var self = this
    getProfile().then((response) => {
      var index = _.findIndex(this.state.items, value => value.id === 'resume')
      const items = update(this.state.items, {
        [index]: {$merge: {url: response.resume}}
      })
      self.setState({ items : items })
    }).catch((error) => {
      console.error('There was an error loading the resume.')
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
          <AppHeader
            items={this.state.items}
            onHomeClick={this.onHomeClick.bind(this)}
            onMenuClick={this.onMenuClick.bind(this)}
            onSideBarItemClick={this.onSideBarItemClick.bind(this)}
            sidebar={this.sidebar}
          />
          <AppContent
            items={this.state.items}
            onPageAreaClick={this.onPageAreaClick.bind(this)}
          />
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

export default App;
