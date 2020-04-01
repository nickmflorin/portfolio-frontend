import { api_fetch } from './utils'


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const getAllExperience = async () => {
  return api_fetch('/experience/')
};

export const getExperience = async (id) => {
  return api_fetch(`/experience/${id}/`)
};

export const getAllEducation = async () => {
  return api_fetch('/education/')
};

export const getEducation = async (id) => {
  return api_fetch(`/education/${id}/`)
};

export const getProjects = async () => {
  return api_fetch(`/projects/`)
}

export const getProject = async (id) => {
  return api_fetch(`/projects/${id}/`)
};

export const getProfile = async (id) => {
  return api_fetch(`/profile/`)
};
