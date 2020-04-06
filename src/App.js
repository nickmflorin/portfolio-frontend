import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import styled from 'styled-components';
import update from 'react-addons-update';
import _ from 'underscore'

import { faGraduationCap, faBriefcase, faHammer, faFilePdf, faHome
  } from '@fortawesome/free-solid-svg-icons'

import { getProfile } from 'services'

import { Landing, Projects, Experience, Education } from 'pages'
import NavBar from 'components/nav'
import SideBar from 'components/sidebar'
import Footer from 'components/footer'

import "./App.sass"

const Theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./style/constants.scss');

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
      var index = _.findIndex(this.state.items, value => value.id == 'resume')
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
  onSideBarClick(){
    this.sidebar.current.hide()
  }
  onHomeClick(){
    this.sidebar.current.hide()
  }
  render() {
    return (
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          <div className='app'>
            <header>
              <SideBar
                items={this.state.items}
                onSideBarClick={this.onSideBarClick.bind(this)}
                ref={this.sidebar}
              />
              <Switch>
                <Route exact path="/">
                  <NavBar
                    overlay={false}
                    items={this.state.items}
                    onMenuClick={this.onMenuClick.bind(this)}
                    onHomeClick={this.onHomeClick.bind(this)}
                  />
                </Route>
                <Route>
                  <NavBar
                    overlay={true}
                    items={this.state.items}
                    onMenuClick={this.onMenuClick.bind(this)}
                    onHomeClick={this.onHomeClick.bind(this)}
                  />
                </Route>
              </Switch>
            </header>
            <div className='content'>
              {_.filter(this.state.items, item => item.id !== 'resume').map((item) => {
                return (
                  <Route
                    key={item.id}
                    exact path={item.url}
                    component={item.page}
                  ></Route>
                )
              })}
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
