import React from 'react';

export const NavBarContext = React.createContext([
  {'id' : 'about', 'label' : 'About Me', 'link' : '/about'},
  {'id' : 'experience', 'label' : 'Experience', 'link' : '/experience'},
  {'id' : 'education', 'label' : 'Education', 'link' : '/education'},
]);
