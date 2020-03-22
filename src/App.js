import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import NavBar from './components/nav'

import Landing from './pages/landing/landing'
import About from './pages/about/about'
import Experience from 'pages/experience/experience'
import Education from './pages/education/education'

import './style/App.scss';

// Extract our Sass variables into a JS object
const theme = require('sass-extract-loader!./style/constants.scss');

const NavBarItems = [
  {'id' : 'about', 'label' : 'About Me', 'link' : '/about', 'component': About},
  {'id' : 'experience', 'label' : 'Experience', 'link' : '/experience', 'component': Experience},
  {'id' : 'education', 'label' : 'Education', 'link' : '/education', 'component': Education},
]


function content(navbar_overlay=false){
  class AppContent extends React.Component {
    render() {
      return (
        <div className="app-content">
          <header>
            <NavBar
              overlay={navbar_overlay}
              items={NavBarItems}
            />
          </header>
          <section className="content">
              <Route exact path="/" component={Landing}></Route>
              {NavBarItems.map((item) => {
                return (
                  <Route
                    key={item.id}
                    exact path={item.link}
                    component={item.component}
                  ></Route>
                )
              })}
          </section>
          <footer>
            <div className="footer-content">
              <p>Copyright © 2018 Nick Florin All rights reserved.</p>
            </div>
          </footer>
        </div>
      )
    }
  }
  return AppContent
}


class App extends React.Component {
  navSelected(){
    console.log('Nav Clicked')
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="base">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={content(false)}></Route>
              <Route component={content(true)}></Route>
            </Switch>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
