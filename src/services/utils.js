// TODO: We want to eventually put this in a config file or an environment variable.
const API_HOST = "http://localhost:8000/api/v1"

export const api_fetch = function(url) {
  const URL = `${API_HOST}${url}`;
  return fetch(URL, {
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  });
}
