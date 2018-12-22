import uuidv4 from 'uuid/v4';

const CLIENT_ID = "d_6Sdd-LQzIZkw";
const RESPONSE_TYPE = "token";
const STATE = uuidv4();
const REDIRECT_URL = "http://census.redditkpop.com/sign-in";
const DURATION = "temporary";
const SCOPE = "identity";
export const OAUTH_PATH = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${STATE}&redirect_uri=${REDIRECT_URL}&duration=${DURATION}&scope=${SCOPE}`;
