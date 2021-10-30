import { API_URL } from '../../App';

/**
export default async function sendLoginCredentials(username: string, password: string) {
    const loginData = JSON.stringify({
        'email': username,
        'password': password
    });
    await fetch(API_URL + 'login/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: loginData
    }).then((response) => console.log(response)).catch(() => console.log("Could not connect to the server"));
}
*/

export default async function sendLoginCredentials(username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: username,
            password: password
        })
    }
    return await fetch("https://reqres.in/api/login", requestOptions)
        //then(response => response.json())
        //.then(data => console.log(data.token))
        //.catch(() => console.log("Could not connect to the server"))
        //return response;
}