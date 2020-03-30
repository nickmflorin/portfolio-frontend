import { api_fetch } from './utils'


var getProfile = async (id) => {
  const response = await api_fetch(`/profile/`)
  const data = await response.json()
  if (response.status !== 200){
    throw Error(data.message);
  }
  return data
};

export default getProfile;
