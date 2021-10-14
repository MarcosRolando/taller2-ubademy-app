export default {
    name: 'UbademyApp',
    version: '1.0.0',
    extra: {
      API_URL: (process.env.PROD != undefined) ? "https://ubademy-api-gate.herokuapp.com/" : "http://localhost:8516/",
    },
};
