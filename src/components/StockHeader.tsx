import styled from "styled-components";
import { n, StockResponse } from "../model/Model";
import axios from "axios";
import { useCallback, useState } from "react";
import TradeModal from "./TradeModal";


const StockHeaderContainer = styled.div`
  height: 100px;
  border: 1px solid #8a84da;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .waiting {
    font-size: 30px;
    margin: 0 auto;
  }
  .name {
    font-size: 26px;
    font-weight: bold;
  }
  .leftStockHeader {
    padding-left: 20px;
    line-height: 2.0rem;
  }
  .rightStockHeader {
    padding-right: 20px;
    line-height: 2.0rem;
  }
  .ctrt {
    font-size: 20px;
  }
`;

interface PropsData {
  stock: StockResponse | null;
  name: string;
}

// type BuyTrade = {
//   onSubmit: (form: {Stockname: string; price: number; stockNumber: number; }) => void
// };

const StockHeader = ({ stock, name }: PropsData) => {
  const [openTradeModal, setOpenTradeModal] = useState<boolean>(false);
  const [activeModalTab, setActiveModalTab] = useState<number>(0);
  const [form, setForm] = useState({
    Stockname: '',
    price: 0,
    stockNumber: 0,
  });
  const {Stockname, price, stockNumber} = form;
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({
      ...form,
     [name]: value,
    })
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onSubmit(form);
    setForm({
      Stockname: '',
      price: 0,
      stockNumber: 0,
    });
    console.log(form);
    
  };

  const data = stock?.output[29];
  const color = !data ? undefined : (data?.prdy_ctrt.includes('-') ? 'red-text' : 'blue-text');
  
  const onClickToggleModal = useCallback(() => {
    setOpenTradeModal(!openTradeModal);
  }, [openTradeModal]);

  return (
    <>
      <StockHeaderContainer>
        {openTradeModal && (
          <TradeModal onClickToggleModal={onClickToggleModal} >
            {/* 여기 children */}
            <h2>주식 매수</h2>
            <ul>
              <li className="cursor-pointer" onClick={() => setActiveModalTab(0)} style={{
                  fontWeight: activeModalTab === 0 ? 'bold' : 'normal',
                  backgroundColor: activeModalTab === 0 ? '#33F5FF' : '#fff'
                }}>지정가</li>
              <li className="cursor-pointer" onClick={() => setActiveModalTab(1)} style={{
                  fontWeight: activeModalTab === 1 ? 'bold' : 'normal',
                  backgroundColor: activeModalTab === 1 ? '#33F5FF' : '#fff'
                }}>시장가</li>
            </ul>
            <form onSubmit={handleSubmit}>
              <input type="" name="주식이름" value={Stockname} onChange={onChange} />
              <input type="number" name="가격" value={price} onChange={onChange} />
              <input type="number" name="주 수량" value={stockNumber} onChange={onChange} />
              <button type="submit" >매수하기</button>
            </form>
          </TradeModal>
        )}

        {!stock ? 
          <div className="waiting">
            잠시만 기다려주세요..
          </div>
          :
          <>
            <div className="leftStockHeader">
              <div className="name">
                {name}
              </div>
              <p className="oprc">
                {data ? `${n(Number(data?.stck_oprc))} 원` : null}
              </p>
            </div>
            <div className="rightStockHeader">
              <div className={`ctrt ${color}`}>
                {`전일 대비 ${data?.prdy_ctrt} %`}
              </div>
              <div className="acml">
                {data ? `거래량 ${n(Number(data?.acml_vol))} 주` : null}
              </div>
              <button onClick={onClickToggleModal}>매수하기</button>
            </div>
          </>
        }
      </StockHeaderContainer>
    </>
  );
}

export default StockHeader;