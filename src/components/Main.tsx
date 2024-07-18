import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartBar from './ChartBar';
import Header from './Header';
import { TokenResponse, OutputArr, StockResponse } from '../model/Model';
import styled from 'styled-components';

const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  /* 추후 높이 삭제 */
  height: 2000px;
`;

function Main(): React.ReactElement {

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
  // useEffect(() => {
  //   const fetchStockData = async () => {
  //     const stockCodes = ["005930", "066570", "035420", "000660", "035720"];
  //     if (token) {
  //       try {
  //         const allStockData = [];
  //         for (let code of stockCodes) {
  //           const response = await axios.get<StockResponse>("/uapi/domestic-stock/v1/quotations/inquire-daily-price", {
  //             headers: {
  //               "authorization": `Bearer ${token.access_token}`,
  //               "appkey": process.env.REACT_APP_APP_KEY,
  //               "appsecret": process.env.REACT_APP_APP_SECRET_KEY,
  //               "tr_id": "FHKST01010400"
  //             },
  //             params: {
  //               "FID_COND_MRKT_DIV_CODE": "J",
  //               "FID_INPUT_ISCD": code,
  //               "FID_PERIOD_DIV_CODE": "D",
  //               "FID_ORG_ADJ_PRC": "1"
  //             }
  //           });
  //           allStockData.push(response.data);
  //           await sleep(500); // 각 요청 사이에 500ms 지연
  //         }
  //         console.log('올스톡데이터', allStockData);
  //         setStock(allStockData);
          
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };

  //   fetchStockData();
  // }, [token]);

  // 삼성전자 005930 엘지전자 066570 네이버 035420 SK하이닉스 000660 카카오 035720
  const companyName = ['삼성전자', '엘지전자', '네이버', 'SK하이닉스', '카카오'];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <MainContainer>
        <div>
          <Header />
        </div>

        {/* <div>
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
        </div> */}

      </MainContainer>
    </>
  );
}

export default Main;