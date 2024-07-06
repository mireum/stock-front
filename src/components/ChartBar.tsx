import React from 'react';
import { BarChart, CartesianGrid, Tooltip, XAxis, YAxis, Bar } from 'recharts';
import { StockResponse } from './Main';

type StockData = {
  stock: StockResponse | null;
}

function ChartBar({ stock }: StockData): React.ReactElement {

  // if (!stock || !stock.output || stock.output.length === 0) {
  if (!stock) {
    return <p>No data available</p>;
  }

  // 필요한 데이터 변환
  // const data = stock.output.map((item, index) => ({
  //   stck_bsop_date: stock.stck_bsop_date,
  //   stck_oprc: stock.stck_oprc,
  //   stck_hgpr: stock.stck_hgpr,
  //   stck_lwpr: stock.stck_lwpr,
  //   stck_clpr: stock.stck_clpr,
  //   acml_vol: stock.acml_vol,
  // }));
  // console.log(`데이터::`, data);
  

  return (
    // <BarChart width={500} height={300} data={data} >
    //   <CartesianGrid strokeDasharray="3 3" />
    //   <XAxis dataKey='stck_bsop_date' />
    //   <YAxis />
    //   <Tooltip />
    //   <Bar dataKey={
    //     (data) => {
    //       const range = [data.stck_hgpr, data.stck_lwpr]
    //       return range
    //     }
    //   }
    //   fill = "#E94560" >
    //     {stock.output.map((item, index) => ({
    //       stck_bsop_date: item.stck_bsop_date,
    //       stck_oprc: stock.stck_oprc,
    //       stck_hgpr: stock.stck_hgpr,
    //       stck_lwpr: stock.stck_lwpr,
    //       stck_clpr: stock.stck_clpr,
    //       acml_vol: stock.acml_vol,
    //     }))}

    //   </Bar>
    // </BarChart>
    <>
    </>
  );
}

export default ChartBar;