import styled from "styled-components";
import { n, StockResponse, TokenResponse } from "../model/Model";
import axios from "axios";

const StockHeaderContainer = styled.div`
  height: 100px;
  border: 1px solid #8a84da;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .waiting {
    font-size: 30px;
    margin: 0 auto;
  }

  .name {
    font-size: 26px;
    font-weight: bold;
  }

  .leftStockHeader {
    padding-left: 20px;
    line-height: 2.0rem;
  }
  .rightStockHeader {
    padding-right: 20px;
    line-height: 2.0rem;
  }

  .ctrt {
    font-size: 20px;

  }
`;

interface PropsData {
  token: TokenResponse | null;
  stock: StockResponse | null;
  name: string;
}

const StockHeader = ({ token, stock, name }: PropsData) => {
  const data = stock?.output[29];
  const color = !data ? undefined : (data?.prdy_ctrt.includes('-') ? 'red-text' : 'green-text');
  
  // 매수 VTTC0802U
  const handleBuyTrade = async () => {
    try {
      const response = await axios(`${process.env.REACT_APP_BACKEND_URL}`)
    } catch (err) {
      console.error(err);
    }
  };
  // // 매도 VTTC0801U
  // const handleTrade = async () => {
  //   try {
  //     const response = await axios.post(`/uapi/domestic-stock/v1/trading/order-cash`, {
  //       headers: {
  //         "authorization": `Bearer ${token?.access_token}`,
  //         "appkey": process.env.REACT_APP_APP_KEY,
  //         "appsecret": process.env.REACT_APP_APP_SECRET_KEY,
  //         "tr_id": 
  //       }
  //     }, {withCredentials:true});
  //     console.log(response);
  //     // navigate('/');
  //     // window.location.reload();
      
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <StockHeaderContainer>
      {!stock ? 
        <div className="waiting">
          잠시만 기다려주세요..
        </div>
        :
        <>
          <div className="leftStockHeader">
            <div className="name">
              {name}
            </div>
            <p className="oprc">
              {data ? `${n(Number(data?.stck_oprc))} 원` : null}
            </p>
          </div>
          <div className="rightStockHeader">
            <div className={`ctrt ${color}`}>
              {`전일 대비 ${data?.prdy_ctrt} %`}
            </div>
            <div className="acml">
              {data ? `거래량 ${n(Number(data?.acml_vol))} 주` : null}
            </div>
            <button onClick={handleBuyTrade}></button>
          </div>
        </>
      }
    </StockHeaderContainer>
  );
}

export default StockHeader;