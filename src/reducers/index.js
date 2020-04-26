import { combineReducers } from 'redux'
import _ from 'underscore'
import { isNil } from 'lodash';

import {faBriefcase, faFilePdf, faGraduationCap, faHammer, faHome} from "@fortawesome/free-solid-svg-icons";
import {Education, Experience, Landing, Projects} from "pages";
import { sortExperienceEducation } from 'utils'

import {
  REQUESTING_PROFILE,
  RECEIVED_PROFILE,
  ERROR_REQUESTING_PROFILE,
  REQUESTING_COMMENTS,
  RECEIVED_COMMENTS,
  ERROR_REQUESTING_COMMENTS,
  REQUESTING_ALL_EXPERIENCE,
  RECEIVED_ALL_EXPERIENCE,
  ERROR_REQUESTING_ALL_EXPERIENCE,
  REQUESTING_ALL_EDUCATION,
  RECEIVED_ALL_EDUCATION,
  ERROR_REQUESTING_ALL_EDUCATION,
  REQUESTING_PROJECTS,
  RECEIVED_PROJECTS,
  ERROR_REQUESTING_PROJECTS,
  ERROR_PUBLISHING_COMMENT,
  PUBLISHED_COMMENT,
  PUBLISHING_COMMENT,
  RECEIVED_EDUCATION,
  REQUESTING_EDUCATION,
  ERROR_REQUESTING_EDUCATION,
} from 'actions'

const NavBarItems = [
  {
    id : 'home',
    label : 'Home',
    url : '/',
    icon: faHome,
    page: Landing,
  },
  {
    id : 'experience',
    label : 'Experience',
    url : '/experience',
    icon: faBriefcase,
    page: Experience,
  },
  {
    id : 'education',
    label : 'Education',
    url : '/education',
    icon: faGraduationCap,
    page: Education,
  },
  {
    id : 'projects',
    label : 'Projects',
    url : '/projects',
    icon: faHammer,
    page: Projects,
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: faFilePdf,
  }
]

const initialState = {
  navbar: {
    items: NavBarItems,
  },
  profile: {},
  loading: false,
  comments: {
    all: [],
    errors: {},
    publishing: false,
  },
  education: {
    all: [],
  },
  experience: {
    all: [],
  },
  projects: {
    all: [],
  },
}


const navbarItemsReducer = (state = initialState.navbar, action) => {
  const newState = { ...state };
  newState.items = NavBarItems;
  return newState;
}

const loadingReducer = (state=initialState.loading, action) => {
  if (action.type === REQUESTING_PROFILE) {
    return true;
  } else if (action.type == REQUESTING_COMMENTS) {
    return true;
  } else if (action.type == REQUESTING_ALL_EXPERIENCE) {
    return true;
  } else if (action.type == REQUESTING_ALL_EDUCATION) {
    return true;
  } else if (action.type == REQUESTING_PROJECTS) {
    return true;
  } else if (action.type === REQUESTING_EDUCATION) {
    return true;
  } else if (action.type === RECEIVED_PROFILE) {
    return false;
  } else if (action.type == ERROR_REQUESTING_PROFILE) {
    return false;
  } else if (action.type === RECEIVED_COMMENTS) {
    return false;
  } else if (action.type === ERROR_REQUESTING_COMMENTS) {
    return false;
  } else if (action.type === RECEIVED_ALL_EXPERIENCE) {
    return false;
  } else if (action.type === ERROR_REQUESTING_ALL_EXPERIENCE) {
    return false;
  } else if (action.type === RECEIVED_ALL_EDUCATION) {
    return false;
  } else if (action.type === ERROR_REQUESTING_ALL_EDUCATION) {
    return false;
  } else if (action.type === RECEIVED_PROJECTS) {
    return false;
  } else if (action.type === ERROR_REQUESTING_PROJECTS) {
    return false;
  } else if (action.type === RECEIVED_EDUCATION) {
    return false;
  }
  return state;
}


const profileReducer = (state = initialState.profile, action) => {
    const newState = { ...state };
    if (action.type === RECEIVED_PROFILE) {
      return { ...action.value };
    }
    return newState;
}

const commentsReducer = (state = initialState.comments, action) => {
  const newState = { ...state };
  if (action.type === RECEIVED_COMMENTS) {
    newState.all = [ ...action.value ];
  } else if (action.type === PUBLISHING_COMMENT) {
    newState.publishing = true;
  } else if (action.type === PUBLISHED_COMMENT) {
    newState.publishing = false;
  } else if (action.type === ERROR_PUBLISHING_COMMENT) {
    newState.publishing = false;
    if (!isNil(action.value)) {
      newState.errors = action.value;
    }
  }
  return newState;
}

const educationReducer = (state = initialState.education, action) => {
  const newState = { ...state };
  if (action.type === RECEIVED_ALL_EDUCATION) {
    newState.all = sortExperienceEducation(action.value);
  } else if (action.type === RECEIVED_EDUCATION) {
    newState[action.value.id] = action.value;
  } else if (action.type === ERROR_REQUESTING_EDUCATION) {
    newState[action.value] = {error: true}
  }
  return newState;
}

const experienceReducer = (state = initialState.experience, action) => {
  const newState = { ...state };
  if (action.type === RECEIVED_ALL_EXPERIENCE) {
    newState.all = sortExperienceEducation(action.value);
  }
  return newState;
}

const projectsReducer = (state = initialState.experience, action) => {
  const newState = { ...state };
  if (action.type === RECEIVED_PROJECTS) {
    newState.all = _.filter(action.value, (item) => item.showcase);
  }
  return newState;
}

export default combineReducers({
  navbar: navbarItemsReducer,
  profile: profileReducer,
  loading: loadingReducer,
  comments: commentsReducer,
  experience: experienceReducer,
  education: educationReducer,
  projects: projectsReducer,
})
