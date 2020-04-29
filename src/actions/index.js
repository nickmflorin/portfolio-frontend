import { isNil } from 'lodash';
import Cookies from "js-cookie";

import { generateResume } from 'utils';
import { REQUEST_CONFIGURATION } from 'config';

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

export const REQUESTING_EXPERIENCE = "REQUESTING_EXPERIENCE";
export const RECEIVED_EXPERIENCE = "RECEIVED_EXPERIENCE";
export const ERROR_REQUESTING_EXPERIENCE = "ERROR_REQUESTING_EXPERIENCE";

export const REQUESTING_ALL_EDUCATION = "REQUESTING_ALL_EDUCATION";
export const RECEIVED_ALL_EDUCATION = "RECEIVED_ALL_EDUCATION";
export const ERROR_REQUESTING_ALL_EDUCATION = "ERROR_REQUESTING_ALL_EDUCATION";

export const REQUESTING_EDUCATION = "REQUESTING_EDUCATION";
export const RECEIVED_EDUCATION = "RECEIVED_EDUCATION";
export const ERROR_REQUESTING_EDUCATION = "ERROR_REQUESTING_EDUCATION";

export const ERROR_REQUESTING_PROJECTS = "ERROR_REQUESTING_PROJECTS";
export const REQUESTING_PROJECTS = "REQUESTING_PROJECTS";
export const RECEIVED_PROJECTS = "RECEIVED_PROJECTS";

export const REQUESTING_PROJECT = "REQUESTING_PROJECT";
export const RECEIVED_PROJECT = "RECEIVED_PROJECT";
export const ERROR_REQUESTING_PROJECT = "ERROR_REQUESTING_PROJECT";

export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR"
export const CLOSE_SIDEBAR = "CLOSE_SIDEBAR"
export const OPEN_SIDEBAR = "OPEN_SIDEBAR"

export const REQUESTING_RESUME = "REQUESTING_RESUME";
export const RECEIVED_RESUME = "RECEIVED_RESUME";
export const ERROR_REQUESTING_RESUME = "ERROR_REQUESTING_RESUME";
export const GENERATING_RESUME = "GENERATING_RESUME";
export const GENERATED_RESUME = "GENERATED_RESUME";
export const ERROR_GENERATING_RESUME = "ERROR_GENERATING_RESUME";

export const requestingResumeAction = () => {
  return { type: REQUESTING_RESUME };
}

export const receiveResumeAction = (resume) => {
  return { type: RECEIVED_RESUME, value: resume };
}

export const errorRequestingResumeAction = () => {
  return { type: ERROR_REQUESTING_RESUME };
}

export const generatingResumeAction = (resume) => {
  return { type: GENERATING_RESUME, value: resume };
}

export const errorGeneratingResumeAction = () => {
  return { type: ERROR_GENERATING_RESUME };
}

export const generatedResumeAction = () => {
  return { type: GENERATED_RESUME };
}


export const generateResumeAction = () => {
  let request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingResumeAction())
    return fetch(`${process.env.REACT_APP_API_HOST}resume/`, request_config)
      .then(
        response => response.json(),
        error => {
          dispatch(errorRequestingResumeAction())
          console.error(`There was an error requesting the resume.`, error)
        }
      )
      .then(json => {
        dispatch(receiveResumeAction(json))
        dispatch(generatingResumeAction(json))
        generateResume(json)
        dispatch(generatedResumeAction())
      })
      .catch(error => {
        dispatch(errorRequestingResumeAction())
        console.error(`There was an error requesting the resume.`, error)
      })
  }
}

export const toggleSidebarAction = () => {
  return { type: TOGGLE_SIDEBAR };
}

export const closeSidebarAction = () => {
  return { type: CLOSE_SIDEBAR };
}

export const openSidebarAction = () => {
  return { type: OPEN_SIDEBAR };
}

export const requestingProjectAction = (id) => {
  return { type: REQUESTING_PROJECT, value: id };
}

export const receiveProjectAction = (project) => {
  return { type: RECEIVED_PROJECT, value: project };
}

export const errorRequestingProjectAction = (id) => {
  return { type: ERROR_REQUESTING_PROJECT, value: id };
}

export const shouldFetchProject = (state, id) => {
  if (!(isNil(state.projects[id]))) {
    return false;
  } else {
    return true;
  }
}

export const fetchProjectIfNeeded = (id) => {
  return (dispatch, getState) => {
    if (shouldFetchProject(getState(), id)) {
      return dispatch(fetchProject(id))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}

export const fetchProject = (id) => {
  let request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingProjectAction(id))
    return fetch(`${process.env.REACT_APP_API_HOST}projects/${id}/`, request_config)
      .then(
        response => response.json(),
        error => {
          dispatch(errorRequestingProjectAction(id))
          console.error(`There was an error loading project ${id}.`, error)
        }
      )
      .then(json => dispatch(receiveProjectAction(json)))
      .catch(error => {
        dispatch(errorRequestingProjectAction(id))
        console.error(`There was an error loading project ${id}.`, error)
      })
  }
}

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
  let request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingProjectsAction())
    return fetch(`${process.env.REACT_APP_API_HOST}projects/`, request_config)
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => {
          dispatch(errorRequestingProjectsAction())
          console.error('There was an error loading projects.', error)
        }
      )
      .then(json => dispatch(receivedProjectsAction(json)))
      .catch(error => {
        dispatch(errorRequestingProjectsAction())
        console.error('There was an error loading projects.', error)
      })
  }
}

export const requestingExperienceAction = (id) => {
  return { type: REQUESTING_EXPERIENCE, value: id };
}

export const receiveExperienceAction = (education) => {
  return { type: RECEIVED_EXPERIENCE, value: education };
}

export const errorRequestingExperienceAction = (id) => {
  return { type: ERROR_REQUESTING_EXPERIENCE, value: id };
}

export const shouldFetchExperience = (state, id) => {
  if (!(isNil(state.experience[id]))) {
    return false;
  } else {
    return true;
  }
}

export const fetchExperienceIfNeeded = (id) => {
  return (dispatch, getState) => {
    if (shouldFetchExperience(getState(), id)) {
      return dispatch(fetchExperience(id))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}

export const fetchExperience = (id) => {
  let request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingExperienceAction(id))
    return fetch(`${process.env.REACT_APP_API_HOST}experience/${id}/`, request_config)
      .then(
        response => response.json(),
        error => {
          dispatch(errorRequestingExperienceAction(id))
          console.error(`There was an error loading experience ${id}.`, error)
        }
      )
      .then(json => dispatch(receiveExperienceAction(json)))
      .catch(error => {
        dispatch(errorRequestingExperienceAction(id))
        console.error(`There was an error loading education ${id}.`, error)
      })
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
  let request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingAllExperienceAction())
    return fetch(`${process.env.REACT_APP_API_HOST}experience/`, request_config)
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => {
          dispatch(errorRequestingAllExperienceAction())
          console.error('There was an error loading experience.', error)
        }
      )
      .then(json => dispatch(receivedAllExperienceAction(json)))
      .catch(error => {
        dispatch(errorRequestingAllExperienceAction())
        console.error('There was an error loading experience.', error)
      })
  }
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
  let request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingEducationAction(id))
    return fetch(`${process.env.REACT_APP_API_HOST}education/${id}/`, request_config)
      .then(
        response => response.json(),
        error => {
          dispatch(errorRequestingEducationAction(id))
          console.error(`There was an error loading education ${id}.`, error)
        }
      )
      .then(json => dispatch(receiveEducationAction(json)))
      .catch(error => {
        dispatch(errorRequestingEducationAction(id))
        console.error(`There was an error loading education ${id}.`, error)
      })
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

export const fetchAllEducation = () => {
  let request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingAllEducationAction())
    return fetch(`${process.env.REACT_APP_API_HOST}education/`, request_config)
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => {
          dispatch(errorRequestingAllEducationAction())
          console.error('There was an error loading education.')
        }
      )
      .then(json => dispatch(receivedAllEducationAction(json)))
      .catch(error => {
        dispatch(errorRequestingAllEducationAction())
        console.error(`There was an error loading the education.`, error)
      })
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
  let request_config = { ...REQUEST_CONFIGURATION };
  return dispatch => {
    dispatch(requestingProfileAction())
    return fetch(`${process.env.REACT_APP_API_HOST}comments/`, request_config)
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => {
          dispatch(errorRequestingCommentsAction())
          console.error('There was an error loading comments.', error)
        }
      )
      .then(json => dispatch(receiveCommentsAction(json)))
      .catch(error => {
        dispatch(errorRequestingCommentsAction())
        console.error('There was an error loading comments.', error)
      })
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

export const publishComment = (data, resetForm) => {
  let request_config = { ...REQUEST_CONFIGURATION };
  request_config.method = "POST"
  request_config.body = JSON.stringify(data)
  request_config.headers = { ...REQUEST_CONFIGURATION.headers };
  request_config.headers['X-CSRFToken'] = Cookies.get('csrftoken');

  return dispatch => {
    dispatch(publishingCommentAction(data))
    return fetch(`${process.env.REACT_APP_API_HOST}comments/`, request_config)
      .then(
        response => {
          if (response.status !== 201) {
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
            resetForm()
          }
        },
        // Do not use catch, because that will also catch any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => {
          dispatch(errorPublishingCommentAction())
          console.error('There was an error publishing the comment.', error)
        }
      )
      .catch(error => {
        dispatch(errorPublishingCommentAction())
        console.error('There was an error publishing the comment.', error)
      })
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
  let request_config = { ...REQUEST_CONFIGURATION };
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
      .catch(error => {
        dispatch(errorRequestingProfileAction())
        console.error('There was an error loading profile.')
      })
  }
}
