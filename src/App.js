import React from 'react';
import { HashRouter, Switch, Route} from 'react-router-dom'
import update from 'react-addons-update';
import _ from 'underscore'

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
          <header>
            <SideBar
              items={NavBarItems}
              onSideBarItemClick={this.onSideBarItemClick.bind(this)}
              ref={this.sidebar}
            />
            <Switch>
              <Route exact path="/">
                <NavBar
                  items={this.state.items}
                  onHomeClick={this.onHomeClick.bind(this)}
                  onMenuClick={this.onMenuClick.bind(this)}
                  overlay={false}
                />
              </Route>
              <Route>
                <NavBar
                  items={this.state.items}
                  onHomeClick={this.onHomeClick.bind(this)}
                  onMenuClick={this.onMenuClick.bind(this)}
                  overlay
                />
              </Route>
            </Switch>
          </header>
          <div className="content">
            {_.map(_.filter(this.state.items, (item) => (item.id !== 'resume')), (item) => {
              const PageComponent = item.page
              return (
                <Route
                  exact key={item.id}
                  path={item.url}
                  render={(props) => (
                      <PageComponent
                        onPageAreaClick={this.onPageAreaClick.bind(this)}
                        {...props}
                      />
                  )}
                />
              )
            })}
          </div>
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

export default App;
