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

const StockHeader = ({ stock, name }: PropsData) => {
  const [openTradeModal, setOpenTradeModal] = useState<boolean>(false);
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