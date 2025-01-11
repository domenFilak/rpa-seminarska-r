const BASE_URL = 'http://localhost:5000';

export const FOODS_URL = BASE_URL + '/api/foods';
export const FOODS_TAGS_URL = FOODS_URL + '/tags';
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOODS_BY_TAG_URL = FOODS_URL + '/tag/';
export const FOOD_BY_ID_URL = FOODS_URL + '/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';
export const USER_EMAIL_EXISTS = BASE_URL + '/api/users/emailExists';
export const UPDATE_PASSWORD_URL = BASE_URL + '/api/users/updatePassword';



export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';
export const ORDER_ALL_FOR_CURRENT_USER_URL = ORDERS_URL + '/allOrdersForCurrentUser';
export const ORDER_GET_USER_URL = ORDERS_URL + '/user';
export const ORDER_UPDATE_USER_URL = ORDERS_URL + '/user-update';