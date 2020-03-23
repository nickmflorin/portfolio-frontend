import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import styled from 'styled-components';

import landing from 'media/landing_tint.png';

import NavBar from 'components/nav'
import { Landing, About, Experience, Education } from 'pages'
import { NavBarContext, NavBarTheme } from './context'

// Extract our Sass variables into a JS object
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./style/maps.scss');


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

const AppFooter = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: ${props => props.theme.colors.footer};
  color: ${props => props.theme.colors.white};
  border-top: ${props => props.theme.borders.dark};
  height: ${props => props.theme.heights.footer}
`;

const AppFooterContent = styled.div``;

const AppSection = styled.section`
  height: 100%;
  width: 100%;
  position: absolute;
`;


class App extends React.Component {
  static contextType = NavBarContext;

  render() {
    return (
      <ThemeProvider theme={theme}>
        <NavBarContext.Provider>
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
                          component={item.component}
                        ></Route>
                      )
                    })}
                </AppSection>
                <AppFooter image={landing}>
                  <AppFooterContent>
                    <p>Copyright © 2018 Nick Florin All rights reserved.</p>
                  </AppFooterContent>
                </AppFooter>
              </AppContent>
            </BrowserRouter>
          </AppBase>
        </NavBarContext.Provider>
      </ThemeProvider>
    );
  }
}

export default App;
