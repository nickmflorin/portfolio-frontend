import { api_fetch } from './utils'


var getProject = async (id) => {
  const response = await api_fetch(`/projects/${id}/`)
  const data = await response.json()
  if (response.status !== 200){
    const body = await response.json()
    throw Error(body.message);
  }
  return data
};

export default getProject;
