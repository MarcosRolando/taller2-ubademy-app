import * as http from 'http';


  

export default function foo() {
    console.log("Hola!");
    const postData = JSON.stringify({
        'msg': 'Hello World!'
    });
    const options = {
        hostname: '127.0.0.1',
        port: 8080,
        path: '/upload',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        },
        body: postData
    }
    const req = http.request(options);
    req.end();
}
