const ANIMALS_QUERY_PARAMS = {
  type: 'type',
  limit: 'limit'
};

export const getPets = async (type = '') => {
  const requestUrl = `/animals?&${ANIMALS_QUERY_PARAMS['type']}=${type}`;

  const response = await fetch(requestUrl, {
    method: 'GET'
  });

  const json = await response.json();

  return json;
};

export const getPetDetails = async (id) => {
  const requestUrl = `/animals/${id}`;
  const response = await fetch(requestUrl, {
    method: 'GET'
  });

  const json = await response.json();

  return json;
};

export const getPetTypes = async () => {
  const requestUrl = `/types`;
  const response = await fetch(requestUrl, {
    method: 'GET'
  });

  const json = await response.json();

  return json;
};
