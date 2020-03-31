import { API_HOST, REQUEST_CONFIGURATION } from 'config'
import { ApiError } from './errors'


export const api_fetch = async (url) => {
  const URL = `${API_HOST}${url}`;
  var response = await fetch(URL, REQUEST_CONFIGURATION)
  const data = await response.json()
  if (response.status !== 200){
    throw new ApiError('API_ERROR', response.status, data.message);
  }
  return data
}
