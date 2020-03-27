import { api_fetch } from './utils'


var getEducation = async () => {
  const response = await api_fetch('/education/')
  const data = await response.json()
  if (response.status !== 200){
    const body = await response.json()
    console.log(body.message)
    throw Error(body.message);
  }
  return data
};

export default getEducation;
