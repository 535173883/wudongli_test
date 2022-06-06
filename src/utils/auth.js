export function getToken() {
  return sessionStorage.getItem("token");
}

export function setToken(token) {
  return sessionStorage.setItem("token", token);
}

export function removeToken() {
  return sessionStorage.removeItem("token");
}

export function getuserName() {
  return sessionStorage.getItem("userName");
}

export function setuserName(userName) {
  return sessionStorage.setItem("userName", userName);
}

export function removeuserName() {
  return sessionStorage.removeuserName("userName");
}
