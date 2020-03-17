var getExperience = async () => {
  const response = await fetch('http://localhost:8000/api/v1/experience/', {
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  });
  const data = await response.json()
  if (response.status !== 200){
    const body = await response.json()
    throw Error(body.message);
  }
  return data
};

export default getExperience;
