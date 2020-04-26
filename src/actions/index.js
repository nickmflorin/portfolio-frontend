import { isNil } from 'lodash';

import { REQUEST_CONFIGURATION } from 'config'

export const REQUESTING_PROFILE = "REQUESTING_PROFILE";
export const RECEIVED_PROFILE = "RECEIVED_PROFILE";
export const REQUESTING_COMMENTS = "REQUESTING_COMMENTS";
export const RECEIVED_COMMENTS = "RECEIVED_COMMENTS";
export const REQUESTING_ALL_EXPERIENCE = "REQUESTING_ALL_EXPERIENCE";
export const RECEIVED_ALL_EXPERIENCE = "RECEIVED_ALL_EXPERIENCE";
export const REQUESTING_ALL_EDUCATION = "REQUESTING_ALL_EDUCATION";
export const RECEIVED_ALL_EDUCATION = "RECEIVED_ALL_EDUCATION";
export const REQUESTING_PROJECTS = "REQUESTING_PROJECTS";
export const RECEIVED_PROJECTS = "RECEIVED_PROJECTS";


export const requestingProjectsAction = () => {
  return { type: REQUESTING_PROJECTS };
}

export const receivedProjectsAction = (projects) => {
  return { type: RECEIVED_PROJECTS, value: projects };
}

export const fetchProjects = () => {
  var request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingProjectsAction())
    return fetch(`${process.env.REACT_APP_API_HOST}projects/`, request_config)
      .then(response => response.json())
      .then(json => dispatch(receivedProjectsAction(json)))
      .catch((error) => {
        // TODO: Dispatch to error action to stop loading.
        console.error('There was an error loading projects.')
      })
  }
}

export const requestingAllExperienceAction = () => {
  return { type: REQUESTING_ALL_EXPERIENCE };
}

export const receivedAllExperienceAction = (experience) => {
  return { type: RECEIVED_ALL_EXPERIENCE, value: experience };
}

export const fetchAllExperience = () => {
  var request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingAllExperienceAction())
    return fetch(`${process.env.REACT_APP_API_HOST}experience/`, request_config)
      .then(response => response.json())
      .then(json => dispatch(receivedAllExperienceAction(json)))
      .catch((error) => {
        // TODO: Dispatch to error action to stop loading.
        console.error('There was an error loading education.')
      })
  }
}

export const requestingAllEducationAction = () => {
  return { type: REQUESTING_ALL_EDUCATION };
}

export const receivedAllEducationAction = (education) => {
  return { type: RECEIVED_ALL_EDUCATION, value: education };
}

export const fetchAllEducation = () => {
  var request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingAllEducationAction())
    return fetch(`${process.env.REACT_APP_API_HOST}education/`, request_config)
      .then(response => response.json())
      .then(json => dispatch(receivedAllEducationAction(json)))
      .catch((error) => {
        // TODO: Dispatch to error action to stop loading.
        console.error('There was an error loading education.')
      })
  }
}

export const requestingCommentsAction = () => {
  return { type: REQUESTING_COMMENTS };
}

export const receiveCommentsAction = (comments) => {
  return { type: RECEIVED_COMMENTS, value: comments };
}

export const fetchComments = () => {
  var request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingProfileAction())
    return fetch(`${process.env.REACT_APP_API_HOST}comments/`, request_config)
      .then(response => response.json())
      .then(json => dispatch(receiveCommentsAction(json)))
      .catch((error) => {
        // TODO: Dispatch to error action to stop loading.
        console.error('There was an error loading comments.')
      })
  }
}

export const requestingProfileAction = () => {
    return { type: REQUESTING_PROFILE };
}

export const receiveProfileAction = (profile) => {
  return { type: RECEIVED_PROFILE, value: profile };
}

export const fetchProfile = () => {
  var request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingProfileAction())
    return fetch(`${process.env.REACT_APP_API_HOST}profile/`, request_config)
      .then(response => response.json())
      .then(json => dispatch(receiveProfileAction(json)))
      .catch((error) => {
        // TODO: Dispatch to error action to stop loading.
        console.error('There was an error loading profile.')
      })
  }
}

export const shouldFetchProfile = (state) => {
  return true;
  if (!(isNil(state.profile))) {
    return false;
  } else {
    return true;
  }
}

export const fetchProfileIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchProfile(getState())) {
      return dispatch(fetchProfile())
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}
