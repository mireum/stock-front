import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
  const [myStock, setMyStock] = useState();

  useEffect( () => {
    try {
      const getMyStock = async () => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/mypage/myStock`, {
          kakaoId: JSON.parse(`${localStorage.getItem('KakaoUser')}`).id
        }, {withCredentials:true}); 
        const data = res.data;
        console.log(data);
        setMyStock(data);
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
        {/* 주식이름 내가산금액-퍼센트 퍼센트 */}
        <table>
          <thead>
            <tr>
              <th>주식 이름</th>
              <th>가격</th>
              <th>전일 대비</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>삼성전자</td>
              <td>200000원</td>
              <td>-1.5%</td>
            </tr>
          </tbody>
        </table>
        {!myStock 
        ? <div>로딩중입니다..</div>
        : 
        JSON.stringify(myStock)
        // myStock
        }
      </StockBox>
      
    </MyStockContainer>
  );
}

export default MyStock;