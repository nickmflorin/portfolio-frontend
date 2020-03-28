import React from 'react';

export const NavBarContext = React.createContext([
  {'id' : 'experience', 'label' : 'Experience', 'link' : '/experience'},
  {'id' : 'education', 'label' : 'Education', 'link' : '/education'},
  {'id' : 'projects', 'label' : 'Projects', 'link' : '/projects'},
]);
