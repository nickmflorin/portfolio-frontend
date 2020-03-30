import { api_fetch } from './utils'


var getEducation = async () => {
  const response = await api_fetch('/education/')
  const data = await response.json()
  if (response.status !== 200){
    throw Error(data.message);
  }
  return data
};

export default getEducation;
