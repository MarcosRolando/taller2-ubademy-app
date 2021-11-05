import {API_URL} from '../../api_url';
import axios from 'axios';
import React from 'react';

export async function sendSignupCredentials(email: string, password: string, username: string, 
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>) {
  try {
    const res = await axios.post(API_URL + 'signup/', 
    {email:email, password:password, name:username});
    if (res.data['detail'] == 'incorrect username or password') {
      setErrorMessage('Incorrect email or password');
    }
  } catch(error) {
    setErrorMessage('Connection to server failed');
  }
}
