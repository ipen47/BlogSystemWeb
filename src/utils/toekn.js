const TokenKey = "Admin-Token";
export function getToken() {
  return JSON.parse(window.localStorage.getItem(TokenKey));
}

export function setToken(token) {
  Cookies.set(TokenKey, token);
  return localStorage.setItem(TokenKey, JSON.stringify(token));
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}
