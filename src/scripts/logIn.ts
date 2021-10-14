import Constants from 'expo-constants';

export default async function sendLoginCredentials(username: string, password: string) {
    const loginData = JSON.stringify({
        'email': username,
        'password': password
    });
    console.log(Constants.manifest.extra.api_dev_url);
    await fetch(Constants.manifest.extra.api_dev_url + '/login/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: loginData
    }).then((response) => console.log(response)).catch(() => console.log("Could not connect to the server"));
}
