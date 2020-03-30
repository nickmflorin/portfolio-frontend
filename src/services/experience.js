import { api_fetch } from './utils'


var getExperience = async () => {
  const response = await api_fetch('/experience/')
  const data = await response.json()
  if (response.status !== 200){
    throw Error(data.message);
  }
  return data
};

export default getExperience;
