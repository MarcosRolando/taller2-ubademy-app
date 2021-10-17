import {API_URL} from '../../App';

export default async function sendLoginCredentials(username: string, password: string) {
  const loginData = JSON.stringify({
    'email': username,
    'password': password,
  });
  await fetch(API_URL + 'login/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: loginData,
  }).then((response) => console.log(response)).catch(() => console.log('Could not connect to the server'));
}
