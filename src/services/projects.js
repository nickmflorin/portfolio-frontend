import { api_fetch } from './utils'


export const getProjects = async () => {
  const response = await api_fetch(`/projects/`)
  const data = await response.json()
  if (response.status !== 200){
    throw Error(data.message);
  }
  return data
}


export const getProject = async (id) => {
  const response = await api_fetch(`/projects/${id}/`)
  const data = await response.json()
  if (response.status !== 200){
    throw Error(data.message);
  }
  return data
};
