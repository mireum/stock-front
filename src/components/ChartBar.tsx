import React from 'react';
import { BarChart, CartesianGrid, Tooltip, XAxis, YAxis, Bar, Cell } from 'recharts';
import { StockResponse, OutputArr } from './Main';

type StockData = {
  stock: StockResponse | null;
}
// type StockData = {
//   stock: OutputArr | null;
// }

function ChartBar({ stock }: StockData): React.ReactElement {

  if (!stock) {
    return <p>No data available</p>;
  }

  console.log(`props-stock`,stock);
  
  // 필요한 데이터 변환
  const data = stock.output.reverse().map((item:OutputArr, index:number) => ({

    stck_hgpr: item.stck_hgpr,
    stck_lwpr: item.stck_lwpr,
    stck_bsop_date: item.stck_bsop_date,
    prdy_vrss_sign: item.prdy_vrss_sign,
    acml_vol: item.acml_vol,
    // stck_oprc: item.stck_oprc,
    // stck_clpr: item.stck_clpr,
  }));
  console.log(`data::`, data);
  
  // 날짜를 문자열로 받아서 MM.DD 형식으로 변환
  const formatDate = (date:string) => {
    // const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    return `${month}.${day}`;
  };


  return (
    <BarChart width={1000} height={500} data={data} >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey='stck_bsop_date' tickFormatter={formatDate} />
      <YAxis />
      <Tooltip />
      <Bar dataKey={
        (data) => {
          const range = [data.stck_lwpr, data.stck_hgpr]
          return range
        }
      }
      name={`가격(KRW)`}
      fill = "#E94560" >
        {data.map((item, index) => (
          <Cell key={index} fill={(Number(item.prdy_vrss_sign) > 3) ? "#006DEE" : "#E94560"} />
        ))}
      </Bar>
      {/* 누적 거래량 */}
      <Bar dataKey={(data)=>((data.acml_vol)/1000)} name={'누적 거래량(백)'} />
    </BarChart>
  );
}

export default ChartBar;