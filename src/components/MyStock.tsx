import styled from "styled-components";

const MyStockContainer = styled.div`
  background-color: aliceblue;

`;
const StockBox = styled.div`

`;


const MyStock = (): React.ReactElement => {
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
        <ul>
          <li></li>
          <li></li>
        </ul>
      </StockBox>
      
    </MyStockContainer>
  );
}

export default MyStock;