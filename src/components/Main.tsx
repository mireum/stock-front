import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartBar from './ChartBar';

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

interface CompanyTab {
  companyName: string;
  stockData: StockResponse | null;
}

function Main(): React.ReactElement {
  const [token, setToken] = useState<TokenResponse | null>(null);
  const [stock, setStock] = useState<StockResponse[]>([]);

  // const [tabs, setTabs] = useState<CompanyTab[]>([
  //   { companyName: '삼성전자', stockData: null },
  //   { companyName: '엘지전자', stockData: null },
  //   { companyName: '네이버', stockData: null },
  //   { companyName: 'SK하이닉스', stockData: null },
  //   { companyName: '카카오', stockData: null },  
  // ]);

  // 현재 활성화된 탭을 관리하는 상태
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    // 토큰은 1분당 1회 발급됨
    // proxy에 주소를 설정했기 때문에 
    // axios.post<TokenResponse>("https://openapivts.koreainvestment.com:29443/oauth2/tokenP",{
    axios.post<TokenResponse>("/oauth2/tokenP",{
      "grant_type": "client_credentials",
      "appkey":process.env.REACT_APP_APP_KEY,
      "appsecret":process.env.REACT_APP_APP_SECRET_KEY
    })
    .then((response)=>{
      setToken(response.data);
      // console.log('토큰!!::', response.data.access_token);
    })
    .catch((error)=>{
      console.log(error);      
    })

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
      {/* <div> */}
        {/* <p>Token: {token?.access_token}</p> */}
        {/* <p>Stock: {JSON.stringify(stock)}</p> */}
        {/* <ChartBar stock={stock} /> */}
        {/* {stock.map((data:StockResponse, index:number) => (
            <ChartBar stock={data} companyName={companyName[index]} />
          )
        )} */}

      {/* </div> */}
      {/* <div>
        <ul>
          <li onClick={()=>handleTabClick(0)}>삼성전자</li>
          <li onClick={()=>handleTabClick(1)}>엘지전자</li>
          <li onClick={()=>handleTabClick(2)}>네이버</li>
          <li onClick={()=>handleTabClick(3)}>SK하이닉스</li>
          <li onClick={()=>handleTabClick(4)}>카카오</li>
        </ul>
      </div> */}

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
      {/* <div>
        <div className='tabs'>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              {tab.companyName}
            </div>
          ))}
        </div>

        <div className="chart">
          {activeTab !== null && (
            <ChartBar stock={tabs[activeTab].stockData} companyName={tabs[activeTab].companyName} />
          )}
        </div>
      </div> */}
    </>
  );
}

export default Main;