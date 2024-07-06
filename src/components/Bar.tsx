import React from 'react';
import { BarChart } from 'recharts';
import { StockResponse } from './Main';

type StockData = {
  data: StockResponse
}

function Bar({ stock }: StockData): React.ReactElement {


  return (
    <BarChart data={stock}>

    </BarChart>
  );
}

export default Bar;