export default async function sendLoginCredentials(username: string, password: string) {
    const loginData = JSON.stringify({
        'username': username,
        'password': password
    });
    await fetch('https://localhost:8080', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: loginData
    });
}
