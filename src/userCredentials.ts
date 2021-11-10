let userCredentials = {email: '', password: ''};

export function setUserCredentials(email: string, password: string) {
  userCredentials = {email: email, password: password};
}

export function getUserCredentials(): {email: string, password: string} {
  return userCredentials;
}
