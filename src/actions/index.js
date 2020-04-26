import { isNil } from 'lodash';
import Cookies from "js-cookie";

import { REQUEST_CONFIGURATION } from 'config'

export const REQUESTING_PROFILE = "REQUESTING_PROFILE";
export const RECEIVED_PROFILE = "RECEIVED_PROFILE";
export const ERROR_REQUESTING_PROFILE = "ERROR_REQUESTING_PROFILE";

export const PUBLISHING_COMMENT = "PUBLISHING_COMMENT";
export const PUBLISHED_COMMENT = "PUBLISHED_COMMENT";
export const ERROR_PUBLISHING_COMMENT = "ERROR_PUBLISHING_COMMENT";

export const REQUESTING_COMMENTS = "REQUESTING_COMMENTS";
export const RECEIVED_COMMENTS = "RECEIVED_COMMENTS";
export const ERROR_REQUESTING_COMMENTS = "ERROR_REQUESTING_COMMENTS";

export const REQUESTING_ALL_EXPERIENCE = "REQUESTING_ALL_EXPERIENCE";
export const RECEIVED_ALL_EXPERIENCE = "RECEIVED_ALL_EXPERIENCE";
export const ERROR_REQUESTING_ALL_EXPERIENCE = "ERROR_REQUESTING_ALL_EXPERIENCE";

export const REQUESTING_ALL_EDUCATION = "REQUESTING_ALL_EDUCATION";
export const RECEIVED_ALL_EDUCATION = "RECEIVED_ALL_EDUCATION";
export const ERROR_REQUESTING_ALL_EDUCATION = "ERROR_REQUESTING_ALL_EDUCATION";

export const REQUESTING_EDUCATION = "REQUESTING_EDUCATION";
export const RECEIVED_EDUCATION = "RECEIVED_EDUCATION";
export const ERROR_REQUESTING_EDUCATION = "ERROR_REQUESTING_EDUCATION";

export const ERROR_REQUESTING_PROJECTS = "ERROR_REQUESTING_PROJECTS";
export const REQUESTING_PROJECTS = "REQUESTING_PROJECTS";
export const RECEIVED_PROJECTS = "RECEIVED_PROJECTS";


export const requestingProjectsAction = () => {
  return { type: REQUESTING_PROJECTS };
}

export const receivedProjectsAction = (projects) => {
  return { type: RECEIVED_PROJECTS, value: projects };
}

export const errorRequestingProjectsAction = () => {
  return { type: ERROR_REQUESTING_PROJECTS }
}

export const fetchProjects = () => {
  var request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingProjectsAction())
    return fetch(`${process.env.REACT_APP_API_HOST}projects/`, request_config)
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => {
          dispatch(errorRequestingProjectsAction())
          console.error('There was an error loading projects.')
        }
      )
      .then(json => dispatch(receivedProjectsAction(json)))
  }
}

export const requestingAllExperienceAction = () => {
  return { type: REQUESTING_ALL_EXPERIENCE };
}

export const receivedAllExperienceAction = (experience) => {
  return { type: RECEIVED_ALL_EXPERIENCE, value: experience };
}

export const errorRequestingAllExperienceAction = () => {
  return { type: ERROR_REQUESTING_ALL_EXPERIENCE }
}

export const fetchAllExperience = () => {
  var request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingAllExperienceAction())
    return fetch(`${process.env.REACT_APP_API_HOST}experience/`, request_config)
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => {
          dispatch(errorRequestingAllExperienceAction())
          console.error('There was an error loading experience.')
        }
      )
      .then(json => dispatch(receivedAllExperienceAction(json)))
  }
}

export const requestingAllEducationAction = () => {
  return { type: REQUESTING_ALL_EDUCATION };
}

export const receivedAllEducationAction = (education) => {
  return { type: RECEIVED_ALL_EDUCATION, value: education };
}

export const errorRequestingAllEducationAction = () => {
  return { type: ERROR_REQUESTING_ALL_EDUCATION }
}

export const requestingEducationAction = (id) => {
  return { type: REQUESTING_EDUCATION, value: id };
}

export const receiveEducationAction = (education) => {
  return { type: RECEIVED_EDUCATION, value: education };
}

export const errorRequestingEducationAction = (id) => {
  return { type: ERROR_REQUESTING_EDUCATION, value: id };
}

export const shouldFetchEducation = (state, id) => {
  if (!(isNil(state.education[id]))) {
    return false;
  } else {
    return true;
  }
}

export const fetchEducationIfNeeded = (id) => {
  return (dispatch, getState) => {
    if (shouldFetchEducation(getState(), id)) {
      return dispatch(fetchEducation(id))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}

export const fetchEducation = (id) => {
  var request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingEducationAction(id))
    return fetch(`${process.env.REACT_APP_API_HOST}education/${id}/`, request_config)
      .then(
        response => response.json(),
        error => {
          dispatch(errorRequestingEducationAction(id))
          console.error(`There was an error loading education ${id}.`)
        }
      )
      .then(json => dispatch(receiveEducationAction(json)))
      .catch(error => {
        dispatch(errorRequestingEducationAction(id))
        console.error(`There was an error loading education ${id}.`)
      })
  }
}

export const fetchAllEducation = () => {
  var request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingAllEducationAction())
    return fetch(`${process.env.REACT_APP_API_HOST}education/`, request_config)
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => {
          dispatch(errorRequestingAllEducationAction())
          console.error('There was an error loading education.')
        }
      )
      .then(json => dispatch(receivedAllEducationAction(json)))
  }
}

export const requestingCommentsAction = () => {
  return { type: REQUESTING_COMMENTS };
}

export const receiveCommentsAction = (comments) => {
  return { type: RECEIVED_COMMENTS, value: comments };
}

export const errorRequestingCommentsAction = (comments) => {
  return { type: ERROR_REQUESTING_COMMENTS };
}

export const fetchComments = () => {
  console.log('Fetching Comments')
  var request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingProfileAction())
    return fetch(`${process.env.REACT_APP_API_HOST}comments/`, request_config)
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => {
          dispatch(errorRequestingCommentsAction())
          console.error('There was an error loading comments.')
        }
      )
      .then(json => dispatch(receiveCommentsAction(json)))
  }
}

export const publishingCommentAction = (data) => {
  return { type: PUBLISHING_COMMENT, value: data }
}

export const publishedCommentAction = (data) => {
  return { type: PUBLISHED_COMMENT, value: data }
}

export const errorPublishingCommentAction = (errors) => {
  return { type: ERROR_PUBLISHING_COMMENT, value: errors }
}

export const publishComment = (data) => {
  var request_config = { ...REQUEST_CONFIGURATION };
  request_config.method = "POST"
  request_config.body = JSON.stringify(data)
  request_config.headers = { ...REQUEST_CONFIGURATION.headers };
  request_config.headers['X-CSRFToken'] = Cookies.get('csrftoken');

  return dispatch => {
    dispatch(publishingCommentAction(data))
    return fetch(`${process.env.REACT_APP_API_HOST}comments/`, request_config)
      .then(
        response => {
          if (response.status != 201) {
            // TODO: Wrap this around a try/catch.
            // This might be problematic if the response does not contain any JSON data.
            response.json().then(function(data) {
              dispatch(errorPublishingCommentAction(data))
            })
          } else {
            response.json().then(function(data) {
              dispatch(publishedCommentAction(data))
            })
            // TODO: Maybe we should only reload the comments if the submitted comment was public.
            dispatch(fetchComments())
          }
        },
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => {
          dispatch(errorPublishingCommentAction())
          console.error('There was an error loading comments.')
        }
      )
  }
}

export const requestingProfileAction = () => {
    return { type: REQUESTING_PROFILE };
}

export const receiveProfileAction = (profile) => {
  return { type: RECEIVED_PROFILE, value: profile };
}

export const errorRequestingProfileAction = () => {
  return { type: ERROR_REQUESTING_PROFILE };
}

export const fetchProfile = () => {
  var request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingProfileAction())
    return fetch(`${process.env.REACT_APP_API_HOST}profile/`, request_config)
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => {
          dispatch(errorRequestingProfileAction())
          console.error('There was an error loading profile.')
        }
      )
      .then(json => dispatch(receiveProfileAction(json)))
  }
}

export const shouldFetchProfile = (state) => {
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
