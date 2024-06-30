import React, { useState } from 'react';
import axios from 'axios';

interface TokenResponse {
  access_token: string; // 접근토큰
  token_type: string; // 접근토큰 유형(Bearer)
  expires_in: number; // 접근토큰 유효기간(초)
  acess_token_token_expired: string;  // 접근토큰 유효기간(ex) "2022-08-30 08:10:10")
}

interface StockResponse {
  rt_cd: string;  // 성공 실패 여부
  msg_cd: string; // 응답 코드
  msg1: string;   // 응답 메세지
  output: [];     // 응답 상세
  stck_bsop_date: string;  // 주식 영업 일자
  stck_oprc: string;  // 주식 시가
  stck_hgpr: string;  // 주식 최고가
  stck_lwpr: string;  // 주식 최저가
  stck_clpr: string;  // 주식 종가
  acml_vol: string;   // 누적 거래량
  prdy_vrss_vol_rate: string; // 전일 대비 거래량 비율
  prdy_vrss: string;  // 전일 대비
  prdy_vrss_sign: string; // 전일 대비 부호(1:상한, 2:상승, 3:보합, 4:하한, 5:하락)
  prdy_ctrt: string; // 전일 대비율
  hts_frgn_ehrt: string; // HTS 외국인 소진율
  frgn_ntby_qty: string; // 외국인 순매수 수량
  flng_cls_code: string; // 락 구분 코드
  acml_prtt_rate: string; // 누적 분할 비율

}

function Main() {
  const [token, setToken] = useState<string>("");
  const [stock, setStock] = useState<string>("");


  // proxy에 주소를 설정했기 때문에 
  // axios.post<TokenResponse>("https://openapivts.koreainvestment.com:29443/oauth2/tokenP",{
  axios.post<TokenResponse>("/oauth2/tokenP",{
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

  // 주식현재가 일자별 api 요청
  axios.get<StockResponse>("/uapi/domestic-stock/v1/quotations/inquire-daily-price",{
    "authorization": `Bearer + ${token}`,
    "appkey":process.env.REACT_APP_APP_KEY,
    "appsecret":process.env.REACT_APP_APP_SECRET_KEY,
    "tr_id": "FHKST01010400"
  })
  .then((response)=>{
    setStock(response.data.access_token)
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