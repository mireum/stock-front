import styled from "styled-components";
import { StockResponse } from "../model/Model";

const StockHeaderContainer = styled.div`
  height: 100px;
  border: 1px solid #8a84da;
  margin-top: 20px;
`;

interface PropsData {
  stock: StockResponse | null;
  name: string;
}

const AcmlPoint = (str:string | undefined) => {
  if (!str) {
    return undefined
  }

  const parts = str.split('.');
  console.log('parts', parts);
  
  if (parts.length < 2) {
    // 소수점이 없는 경우
    return parts[0];
  }
  const a = parts[0];
  const b = parts[1];
  console.log('a',a);
  console.log('b',b);
  

  // 소수점 뒤에 숫자가 없는 경우
  if (b.length === 0) {
    return a;
  }
  
  // 소수점 첫째 자리까지만 반환
  return (a + '.' + b.slice(0, 2));
};

const StockHeader = ({ stock, name }: PropsData) => {

  console.log('stockHeader', stock);
  const data = stock?.output[29];
  
  return (
    <StockHeaderContainer>
      {!stock ? 
        <div>
          잠시만 기다려주세요..
        </div>
        :
        <div>
          주식정보
          {data?.stck_oprc}
          {name}
          {/* 전일대비량% */}
          {`${data?.prdy_ctrt} %`}
          {/* 거래주 */}
          {`${AcmlPoint(data?.acml_vol)} 주`}
        </div>
      }
    </StockHeaderContainer>
  );
}

export default StockHeader;