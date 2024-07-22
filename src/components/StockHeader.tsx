import { StockResponse } from "../model/Model";

interface PropsData {
  stock: StockResponse | null;
  name: string;
}

const StockHeader = ({ stock, name }: PropsData) => {

  console.log('stockHeader', stock);
  const data = stock?.output[29];
  
  return (
    <div>
      {!stock ? 
        <div>
          잠시만 기다려주세요..
        </div>
        :
        <div>
          주식정보
          {data?.stck_oprc}
          {/* 이름 */}
          {name}
        </div>
      }
    </div>
  );
}

export default StockHeader;