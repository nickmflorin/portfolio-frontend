import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import styled from 'styled-components';

import { pixelfy } from 'utils'

import NavBar from 'components/nav'
import SideBar from 'components/sidebar'
import Footer from 'components/footer'

import { Landing, Projects, Experience, Education } from 'pages'
import { NavBarContext } from './context'

const Theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./style/constants.scss');

const Pages = {
  landing: Landing,
  projects: Projects,
  experience: Experience,
  education: Education
}

const AppContent = styled.div`
  height: 100vh;
`;

const AppHeader = styled.header`
  position: fixed;
  z-index: 900;
  top: 0;
  width: 100%;
  height: ${props => pixelfy(props.theme.heights.header)}
`;

const AppSection = styled.section`
  width: 100%;
  position: absolute;
  background-color: ${props => props.theme.colors.background};
  max-height: ${props => (`calc(100vh - ${pixelfy(props.theme.heights.footer)})`)};
  overflow-y: scroll;
`;


class AppContext extends React.Component {
  render() {
    // ThemeProvider allows access to the SASS maps in styled-components.
    return (
      <ThemeProvider theme={Theme}>
        <NavBarContext.Provider>
          {this.props.children}
        </NavBarContext.Provider>
      </ThemeProvider>
    )
  }
}

class App extends React.Component {
  static contextType = NavBarContext;

  constructor(props, context) {
    super(props, context);
    this.sidebar = React.createRef();
  }
  onMenuClick(){
    this.sidebar.current.toggle()
  }
  onSideBarClick(){
    this.sidebar.current.hide()
  }
  onHomeClick(){
    console.log('Home Clicked')
    this.sidebar.current.hide()
  }
  render() {
    return (
      <AppContext>
        <BrowserRouter>
          <AppContent>
              <AppHeader>
                <SideBar
                  items={this.context}
                  onSideBarClick={this.onSideBarClick.bind(this)}
                  ref={this.sidebar}
                />
                <Switch>
                  <Route exact path="/">
                    <NavBar
                      overlay={true}  // TODO: Remove
                      items={this.context}
                      onMenuClick={this.onMenuClick.bind(this)}
                      onHomeClick={this.onHomeClick.bind(this)}
                    />
                  </Route>
                  <Route>
                    <NavBar
                      overlay={true}  // TODO: Remove
                      items={this.context}
                      onMenuClick={this.onMenuClick.bind(this)}
                      onHomeClick={this.onHomeClick.bind(this)}
                    />
                  </Route>
                </Switch>
              </AppHeader>
              <AppSection>
                  <Route exact path="/" component={Landing}></Route>
                  {this.context.map((item) => {
                    return (
                      <Route
                        key={item.id}
                        exact path={item.link}
                        component={Pages[item.id]}
                      ></Route>
                    )
                  })}
              </AppSection>
              <Footer />
          </AppContent>
        </BrowserRouter>
      </AppContext>
    );
  }
}

export default App;
