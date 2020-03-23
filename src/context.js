import React from 'react';
import { Landing, About, Experience, Education } from 'pages'


export const NavBarContext = React.createContext([
  {'id' : 'about', 'label' : 'About Me', 'link' : '/about', 'component': About},
  {'id' : 'experience', 'label' : 'Experience', 'link' : '/experience', 'component': Experience},
  {'id' : 'education', 'label' : 'Education', 'link' : '/education', 'component': Education},
]);
