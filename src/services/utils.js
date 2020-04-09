import Cookies from 'js-cookie'

import { REQUEST_CONFIGURATION } from 'config'
import { ApiError } from './errors'


export const api_fetch = async (url) => {
  var request_config = { ...REQUEST_CONFIGURATION };
  request_config.method = "GET"
  var response = await fetch(`${process.env.REACT_APP_API_HOST}${url}`, request_config)
  const body = await response.json()
  if (response.status !== 200){
    throw new ApiError(response.status, body);
  }
  return body
}

export const api_post = async (url, data) => {
  var request_config = { ...REQUEST_CONFIGURATION };
  request_config.method = "POST"

  request_config.body = JSON.stringify(data)

  request_config.headers = { ...REQUEST_CONFIGURATION.headers };
  request_config.headers['X-CSRFToken'] = Cookies.get('csrftoken');

  var response = await fetch(`${process.env.REACT_APP_API_HOST}${url}`, request_config)
  const body = await response.json()

  if (response.status !== 201){
    throw new ApiError(response.status, body);
  }
  return body
}
