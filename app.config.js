export default {
    name: 'UbademyApp',
    version: '1.0.0',
    extra: {
      API_URL: "https://ubademy-api-gate.herokuapp.com/",
    },
    android: {
      package: "ubademy.apk",
      config: {
        googleSignIn: {
          apiKey: 'AIzaSyDwz6kInmqnhRQTqcvgU7Xg7z7B9DJX2Fc',
          certificateHash: 'BD03E8B521F1D7589AB02CE5B6DE04DB72C8B759'
        }
      }
    }
};
