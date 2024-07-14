import React, { useState } from 'react';
import { BarChart, CartesianGrid, Tooltip, XAxis, YAxis, Bar, Cell } from 'recharts';
import { StockResponse, OutputArr } from './Main';

type PropsStockData = {
  stock: StockResponse | null;
  companyName: string;
}

function ChartBar({ stock, companyName }: PropsStockData): React.ReactElement {

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

  // 단위에 천 단위 콤마 추가
  const formatYAxis = (tickItem:string) => tickItem.toLocaleString();

  return (
    <>
      <BarChart width={1200} height={500} data={data} syncId="synced" margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey='stck_bsop_date' tickFormatter={formatDate} />
        <YAxis yAxisId='0' label={{ value: 'KRW', offset: '10', angle:0, position: 'top' }} 
          tickFormatter={formatYAxis}
          domain={['dataMin-20000', 'dataMax + 20000']}
        />
        <Tooltip />
        {/* Legend 추가하면 차트 크기가 작아짐 */}
        {/* <Legend layout='vertical' align='right' verticalAlign='top' 
          wrapperStyle={{
            position: 'absolute',
            top: 10,
            right: 130,
            padding: '10px',
            backgroundColor: '#f5f5f5',
            border: '1px solid #d5d5d5',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
          }}
          payload={[{value: companyName, type:'square', id: 'ID00', color: '#8884d8' }]} 
        /> */}
        <Bar dataKey={
          (data) => {
            const range = [data.stck_lwpr, data.stck_hgpr]
            return range
          }
        }
        name={`가격(KRW)`} yAxisId='0'
        fill = "#E94560" >
          {data.map((item, index) => (
            <Cell key={index} fill={(Number(item.prdy_vrss_sign) > 3) ? "#006DEE" : "#E94560"} />
          ))}
        </Bar>
      </BarChart>

      <BarChart width={1200} height={500} data={data} syncId="synced" margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <XAxis dataKey='stck_bsop_date' tickFormatter={formatDate} />
        <YAxis yAxisId='1' label={{ value: "누적 거래량(백)", offset: "10", angle:0, position: "top" }} tickFormatter={formatYAxis} />
        <Tooltip />
        {/* 누적 거래량 */}
        <Bar dataKey={(data)=>((data.acml_vol)/1000)} name={'누적 거래량(백)'} yAxisId='1' fill='#67ac40'/>
      </BarChart>
    </>
  );
}

export default ChartBar;