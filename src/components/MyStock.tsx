import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { MyStockResponse } from "../model/Model";
import { useSelector } from "react-redux";
import { selectPrice } from "../feature/rateSlice";

const MyStockContainer = styled.div`
  background-color: aliceblue;
`;
const StockBox = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    width: 300px;
    font-weight: bold;
    font-size: 26px;
    padding: 30px;
    text-align: center;
    align-self: flex-start;
  }
  table { text-align: center; }
  th {
    width: 240px;
    height: 80px;
    font-weight: bold;
    vertical-align: middle;
  }
  td {
    height: 50px;
    vertical-align: middle;
  }
`;


const MyStock = (): React.ReactElement => {
  const [myStock, setMyStock] = useState<MyStockResponse[] | null>();

  const getPrice = useSelector(selectPrice);
  console.log(getPrice);
  
  const priceArr = getPrice.price;
  
  useEffect( () => {
    try {
      const getMyStock = async () => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/mypage/myStock`, {
          kakaoId: JSON.parse(`${localStorage.getItem('KakaoUser')}`).id
        }, {withCredentials:true}); 
        if (res.data.flag) {
          const stockData = res.data.data;
          const mergedStock = stockData.reduce((acc: Record<string, MyStockResponse>, curr: MyStockResponse) => {
            if (acc[curr.stockname]) {
              acc[curr.stockname].price += curr.price;
              acc[curr.stockname].stockNumber += curr.stockNumber;
            } else {
              acc[curr.stockname] = { ...curr };
            }
            return acc;
          }, {});    
              
          setMyStock(Object.values(mergedStock));
        } else {
          setMyStock(null);
        }
      }
      getMyStock();
    } catch (err) {
      console.error(err);
    }
  }, []);
  // const companyName = ['삼성전자', '엘지전자', '네이버', 'SK하이닉스', '카카오'];

  return (
    <MyStockContainer>
      <StockBox>
        <h1>보유 주식</h1>
        <table>
          <thead>
            <tr>
              <th>주식 이름</th>
              <th>가격</th>
              <th>주식</th>
              <th>손익률</th>
            </tr>
          </thead>
          <tbody>
            {!myStock
            ? <tr><td colSpan={3}>구매한 주식이 없습니다</td></tr>
            :
            myStock.map((item, index) => {
              const companyName = ['삼성전자', '엘지전자', '네이버', 'SK하이닉스', '카카오'];
              const findIndex = companyName.indexOf(item.stockname);
              
              const purchasePrice = item.price / item.stockNumber;  // 내 1주당 구매가격
              const currentPrice = Number(priceArr[findIndex]); // 현재 1주당 시가
              const profitMargin = ((currentPrice-purchasePrice)/currentPrice)*100; // 손익률
              const presentPrice = currentPrice * item.stockNumber; // 현재 자산
              const profitOr = (presentPrice - purchasePrice)/100; // 현재 자산-구매가격
              return (
                <tr key={index}>
                  <td>{item.stockname}</td>
                  <td>{presentPrice.toFixed(2)}({profitOr > 0 ? `+${profitOr.toFixed(2)}` : `${profitOr.toFixed(2)}`}) WON</td>
                  <td>{item.stockNumber}개</td>
                  <td>{profitMargin.toFixed(2)}%</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </StockBox>
      
    </MyStockContainer>
  );
}

export default MyStock;