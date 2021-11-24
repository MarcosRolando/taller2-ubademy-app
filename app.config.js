export default {
    name: 'UbademyApp',
    version: '1.0.0',
    extra: {
      API_URL: (process.env.PROD != undefined) ? "https://ubademy-api-gate.herokuapp.com/" : "http://192.168.1.137:8516/",
    },
};
