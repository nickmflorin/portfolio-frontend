import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import NavBar from './components/nav'

import Landing from './pages/landing/landing'
import About from './pages/about/about'
import Experience from 'pages/experience/experience'
import Education from './pages/education/education'
import Contact from './pages/contact/contact'


import './style/App.scss';


const NavBarItems = [
  {'id' : 'about', 'label' : 'About Me', 'link' : '/about'},
  {'id' : 'experience', 'label' : 'Experience', 'link' : '/experience'},
  {'id' : 'education', 'label' : 'Education', 'link' : '/education'},
  {'id' : 'contact', 'label' : 'Contact', 'link' : '/contact'}
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
              <Route exact path="/about" component={About}></Route>
              <Route exact path="/experience" component={Experience}></Route>
              <Route exact path="/education" component={Education}></Route>
              <Route exact path="/contact" component={Contact}></Route>
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
      <div className="base">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={content(false)}></Route>
            <Route component={content(true)}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
