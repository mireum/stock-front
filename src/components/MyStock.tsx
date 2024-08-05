import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { MyStockResponse } from "../model/Model";

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
  table {
    text-align: center;

  }
  th {
    width: 300px;
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

  useEffect( () => {
    try {
      const getMyStock = async () => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/mypage/myStock`, {
          kakaoId: JSON.parse(`${localStorage.getItem('KakaoUser')}`).id
        }, {withCredentials:true}); 
        if (res.data.flag) {
          setMyStock(res.data.data);
        } else {
          setMyStock(null);
        }
      }
      getMyStock();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <MyStockContainer>
      <StockBox>
        <h1>보유 주식</h1>
        <table>
          <thead>
            <tr>
              <th>주식 이름</th>
              <th>가격</th>
              <th>전일 대비</th>
            </tr>
          </thead>
          <tbody>
            {!myStock
            ? <td colSpan={3}>구매한 주식이 없습니다</td>
            :
            myStock.map((item, index) => {
              return (
                <tr>
                  <td>{item.stockname}</td>
                  <td>{item.price}</td>
                  <td>{item.stockNumber}</td>
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