import axios from 'axios';

const QUERY_REPO = 'query repo';
const QUERY_USER = 'query user';

export const queryTypeOptions = [QUERY_REPO, QUERY_USER];

const SEARCH_USERS_URI = 'https://api.github.com/search/users';
const SEARCH_REPOS_URI = 'https://api.github.com/search/repo';

export const handleApiQuery = () => {};
