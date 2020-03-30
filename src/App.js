import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import styled from 'styled-components';

import NavBar from 'components/nav'
import Footer from 'components/footer'

import { Landing, Projects, Experience, Education } from 'pages'
import { NavBarContext } from './context'

const Theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./style/maps.scss');

const Pages = {
  landing: Landing,
  projects: Projects,
  experience: Experience,
  education: Education
}

const AppBase = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const AppContent = styled.div``;


const AppHeader = styled.header`
  position: fixed;
  z-index: 900;
  top: 0;
  width: 100%;
  height: ${props => props.theme.heights.header}
`;

const AppSection = styled.section`
  width: 100%;
  position: absolute;
  background-color: ${props => props.theme.colors.background};
  min-height: 100%;
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

  render() {
    return (
      <AppContext>
        <AppBase>
          <BrowserRouter>
            <AppContent>
              <AppHeader>
                <Switch>
                  <Route exact path="/">
                    <NavBar
                      overlay={false}  // TODO: Remove
                      items={this.context}
                    />
                  </Route>
                  <Route>
                    <NavBar
                      overlay={true}  // TODO: Remove
                      items={this.context}
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
        </AppBase>
      </AppContext>
    );
  }
}

export default App;
