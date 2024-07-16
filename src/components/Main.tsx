import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartBar from './ChartBar';
import Header from './Header';

interface TokenResponse {
  access_token: string; // 접근토큰
  token_type: string; // 접근토큰 유형(Bearer)
  expires_in: number; // 접근토큰 유효기간(초)
  access_token_token_expired: string;  // 접근토큰 유효기간(ex) "2022-08-30 08:10:10")
}

export interface OutputArr {
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

export type StockResponse = {
  rt_cd: string;  // 성공 실패 여부
  msg_cd: string; // 응답 코드
  msg1: string;   // 응답 메세지
  output: OutputArr[];     // 응답 상세
}

// code=rwH6DBLSAVYBVmiyU-j59DT58_YeAUab33ZzK5e2-UxhJPNHe-5GKQAAAAQKPCQfAAABkLZyoEeo9NUiJo7xnA
// 이제 인가코드를 백엔드로 전달하면 됩니다. 백엔드에서 처리하는 과정을 간단하게 설명하면 
// 백엔드에서 이 인가코드로 액세스토큰을 발급받아 그 액세스토큰으로 유저정보를 조회해서 
// DB에 저장한 후  백엔드에서 jwt 토큰을 프론트로 전달하면 로그인 과정은 끝납니다.


function Main(): React.ReactElement {
  // const [token, setToken] = useState<TokenResponse | null>(null);
  // const [token, setToken] = useState<TokenResponse | null>(
  //   !JSON.parse(`${localStorage.getItem('stockToken')}`)
  //     ? null : JSON.parse(`${localStorage.getItem('stockToken')}`) 
  // );
  const [token, setToken] = useState<TokenResponse | null>(() => {
      const current = new Date();
      // tokenExpiredTime가 더 크면 아직 토큰 유효기간 중, expired = true
      const expired = current < new Date(JSON.parse(`${localStorage.getItem('tokenExpiredTime')}`))
      if (JSON.parse(`${localStorage.getItem('stockToken')}`) && expired) {
        return JSON.parse(`${localStorage.getItem('stockToken')}`)
      } else {
        return null
      }
    }
  );
  const [stock, setStock] = useState<StockResponse[]>([]);

  // 현재 활성화된 탭을 관리하는 상태
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    // 토큰은 1분당 1회 발급됨, 하나 당 최대 24시간
    if (!token) {
      axios.post<TokenResponse>("/oauth2/tokenP",{
        "grant_type": "client_credentials",
        "appkey":process.env.REACT_APP_APP_KEY,
        "appsecret":process.env.REACT_APP_APP_SECRET_KEY
      })
      .then((response)=>{
        setToken(response.data);

        localStorage.setItem('stockToken', JSON.stringify(response.data));
        const current = new Date();
        const currentDay = current.setDate(current.getDate()+1);
        const expiredDay = new Date(currentDay);
        
        localStorage.setItem('tokenExpiredTime', JSON.stringify(expiredDay));
      })
      .catch((error)=>{
        console.log(error);      
      })
    } 
  }, []);
  
  // 모의투자는 1초에 2개가 한계
  const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

  // 주식현재가 일자별 api 요청
  useEffect(() => {
    const fetchStockData = async () => {
      const stockCodes = ["005930", "066570", "035420", "000660", "035720"];
      if (token) {
        try {
          const allStockData = [];
          for (let code of stockCodes) {
            const response = await axios.get<StockResponse>("/uapi/domestic-stock/v1/quotations/inquire-daily-price", {
              headers: {
                "authorization": `Bearer ${token.access_token}`,
                "appkey": process.env.REACT_APP_APP_KEY,
                "appsecret": process.env.REACT_APP_APP_SECRET_KEY,
                "tr_id": "FHKST01010400"
              },
              params: {
                "FID_COND_MRKT_DIV_CODE": "J",
                "FID_INPUT_ISCD": code,
                "FID_PERIOD_DIV_CODE": "D",
                "FID_ORG_ADJ_PRC": "1"
              }
            });
            allStockData.push(response.data);
            await sleep(500); // 각 요청 사이에 500ms 지연
          }
          console.log('올스톡데이터', allStockData);
          setStock(allStockData);
          
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchStockData();
  }, [token]);

  // 삼성전자 005930 엘지전자 066570 네이버 035420 SK하이닉스 000660 카카오 035720
  const companyName = ['삼성전자', '엘지전자', '네이버', 'SK하이닉스', '카카오'];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <div>
        <Header />
      </div>
      {/* <div> */}
        {/* <p>Token: {token?.access_token}</p> */}
        {/* <p>Stock: {JSON.stringify(stock)}</p> */}
        {/* <ChartBar stock={stock} /> */}
        {/* {stock.map((data:StockResponse, index:number) => (
            <ChartBar stock={data} companyName={companyName[index]} />
          )
        )} */}

      <div>
        <div>
          <ul>
            {companyName.map((name, index) => (
              <li key={index} onClick={() => handleTabClick(index)} style={{ cursor: 'pointer', fontWeight: activeTab === index ? 'bold' : 'normal' }}>
                {name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          {stock.length > 0 && activeTab !== null && (
            <ChartBar stock={stock[activeTab]} companyName={companyName[activeTab]} />
          )}
        </div>
      </div>
    </>
  );
}

export default Main;