// key for the localStorage
const authTokenKey = 'TOKEN';

//adding the token in the localStorage
export const addToken = (token: string) => {
  localStorage.setItem(authTokenKey, token);
};

//getting the token from localStorage
export const getToken = () => {
  const token = localStorage.getItem(authTokenKey);
  return token ?? '';
};

//removing the token from localStorage
export const removeToken = () => {
  localStorage.removeItem(authTokenKey);
};
