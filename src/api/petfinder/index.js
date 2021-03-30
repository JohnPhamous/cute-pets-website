const {
  REACT_APP_PET_FINDER_ACCESS_KEY,
  REACT_APP_PET_FINDER_SECRET
} = process.env;

const PET_FINDER_AUTHENTICATION_ENDPOINT =
  'https://api.petfinder.com/v2/oauth2/token';

/** This key is used to get/set the oauth token from local storage. */
export const PET_FINDER_OAUTH_TOKEN_KEY = 'pet-finder-oauth-key';

export const getPetFinderAuthorizationToken = async () => {
  const response = await fetch(PET_FINDER_AUTHENTICATION_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: REACT_APP_PET_FINDER_ACCESS_KEY,
      client_secret: REACT_APP_PET_FINDER_SECRET
    }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    credentials: 'same-origin'
  });

  const json = await response.json();
  /**
   * Note: This is not how you would store tokens in a production application. Tokens stored in local storage are susceptible to different attack vectors. We are using it here for the simplicity of the project.
   */
  sessionStorage.setItem(PET_FINDER_OAUTH_TOKEN_KEY, json['access_token']);
};

const PETS_FINDER_API_BASE_URL = 'https://api.petfinder.com/v2';
const ANIMALS_QUERY_PARAMS = {
  type: 'type',
  limit: 'limit'
};

export const getPets = async (type = '') => {
  /** https://www.petfinder.com/developers/v2/docs/#get-animals */
  const requestUrl = `${PETS_FINDER_API_BASE_URL}/animals?${ANIMALS_QUERY_PARAMS['limit']}=20&${ANIMALS_QUERY_PARAMS['type']}=${type}`;
  let oauthToken = sessionStorage.getItem(PET_FINDER_OAUTH_TOKEN_KEY);

  if (!oauthToken) {
    await getPetFinderAuthorizationToken();
    oauthToken = sessionStorage.getItem(PET_FINDER_OAUTH_TOKEN_KEY);
  }

  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${oauthToken}`
    },
    credentials: 'same-origin'
  });

  const json = await response.json();

  return json;
};

export const getPetDetails = async (id) => {
  const requestUrl = `${PETS_FINDER_API_BASE_URL}/animals/${id}`;
  let oauthToken = localStorage.getItem(PET_FINDER_OAUTH_TOKEN_KEY);

  if (!oauthToken) {
    await getPetFinderAuthorizationToken();
    oauthToken = localStorage.getItem(PET_FINDER_OAUTH_TOKEN_KEY);
  }

  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${oauthToken}`
    },
    credentials: 'same-origin'
  });

  const json = await response.json();

  return json;
};

export const getPetTypes = async () => {
  /** https://www.petfinder.com/developers/v2/docs/#get-animal-types */
  const requestUrl = `${PETS_FINDER_API_BASE_URL}/types`;
  let oauthToken = localStorage.getItem(PET_FINDER_OAUTH_TOKEN_KEY);

  if (!oauthToken) {
    await getPetFinderAuthorizationToken();
    oauthToken = localStorage.getItem(PET_FINDER_OAUTH_TOKEN_KEY);
  }

  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${oauthToken}`
    },
    credentials: 'same-origin'
  });

  const json = await response.json();

  return json;
};
