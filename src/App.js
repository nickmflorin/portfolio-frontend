import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, withRouter} from 'react-router-dom'
import { Router, hashHistory, IndexRoute } from 'react-router';

import { NavBarMini, NavBar } from './layout/nav'

import Landing from './pages/landing/landing'
import Resume from './pages/resume/resume'
import Work from './pages/work/work'
import Contact from './pages/contact/contact'
import About from './pages/about/about'

import './App.css';

function Footer(props) {
  return (
    <footer>
        <p className='footer-content'>Copyright © 2018 Nick Florin All rights reserved.</p>
    </footer>
  );
}

function Header(props) {
  return (
    <header>
        <NavBar />
    </header>
  );
}

function MiniHeader(props) {
  return (
    <header>
        <NavBarMini />
    </header>
  );
}

class App extends Component {
  navSelected(){
    console.log('Nav Clicked')
  }
  render() {
    return (
        <BrowserRouter>
          <div className="App">
              <Switch>
              <Route exact path="/" component={Header}></Route>
              <Route component={MiniHeader}></Route>
              </Switch>

              <section>
                  <Route exact path="/" component={Landing} name="landing"></Route>
                  <Route exact path="/about" component={About}></Route>
                  <Route exact path="/resume" component={Resume}></Route>
                  <Route exact path="/work" component={Work}></Route>
                  <Route exact path="/contact" component={Contact}></Route>
              </section>
            <Footer></Footer>
          </div>
        </BrowserRouter>
    );
  }
}
export default App;
