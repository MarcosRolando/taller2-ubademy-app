import {API_URL} from '../../api_url';
import axios from 'axios';
import React from 'react';

//TODO cambiar el mensaje de error que recibo del server al robotico
export default async function sendLoginCredentials(username: string, password: string, 
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>) {
  try {
    const res = await axios.post(API_URL + 'login/', {email:username, password:password});
    if (res.data['detail'] == 'incorrect username or password') {
      setErrorMessage('Incorrect email or password');
    }
  } catch(error) {
    setErrorMessage('Connection to server failed');
  }
}
