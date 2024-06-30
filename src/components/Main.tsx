import React, { useState } from 'react';
import axios from 'axios';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

function Main() {
  const [token, setToken] = useState<string>("");

  axios.post<TokenResponse>("https://openapivts.koreainvestment.com:29443/oauth2/tokenP",{
      "grant_type": "client_credentials",
      "appkey":process.env.REACT_APP_APP_KEY,
      "appsecret":process.env.REACT_APP_APP_SECRET_KEY
    })
    .then((response)=>{
      setToken(response.data.access_token)
    })
    .catch((error)=>{
      console.log(error);      
    })

  return (
    <div>
      <p>Token: {token}</p>
      
    </div>
  );
}

export default Main;