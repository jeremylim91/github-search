import axios from 'axios';

export const USERS = 'users';
export const REPOS = 'repos';

export const queryTypeOptions = [USERS, REPOS];

// export const SEARCH_USERS_URI = 'https://api.github.com/search/users';
// export const SEARCH_REPOS_URI = 'https://api.github.com/search/repo';

const BACKEND_URL = 'http://localhost:3004';

const Axios = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

export const handleApiQuery = (
  resourceName,
  query,
  setSuggestions,
  page = 1
) => {
  // make a request to the backend
  Axios.get(`/${resourceName}/${query}`)
    .then(({data}) => {
      // use results BE to set suggestions
      setSuggestions(data);
    })
    .catch((err) => console.log(err));
};
