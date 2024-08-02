import styled from "styled-components";
import { n, StockResponse } from "../model/Model";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
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
const TabLi = styled.li<{ $isActive: boolean }>`
  cursor: pointer;
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
  background-color: ${({ $isActive }) => ($isActive ? '#33F5FF' : '#fff')};
  padding: 1rem 4rem;
`;

interface PropsData {
  stock: StockResponse | null;
  name: string;
}

const StockHeader = ({ stock, name }: PropsData) => {
  const [openTradeModal, setOpenTradeModal] = useState<boolean>(false);
  const [activeModalTab, setActiveModalTab] = useState<number>(0);
  const [countBuy, setCountBuy] = useState<number>(1);
  const [form, setForm] = useState({
    Stockname: name,
    price: 0,
    stockNumber: 0,
  });
  const {Stockname, price} = form;

  useEffect(() => {
    if (openTradeModal) {
      setForm((prevForm) => ({
        ...prevForm,
        Stockname: name,
      }));
    }
  }, [openTradeModal, name]);

  const handleBuyPrice = () => {
    setCountBuy(countBuy + 1);
    setForm({...form, price: Number(data?.stck_hgpr) * (countBuy+1), stockNumber: countBuy+1});
  };

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {    
    const {name, value} = e.target;
    setForm((prev) => ({
      ...prev,
     [name]: value,
     stockNumber: Number((Number(e.target.value) / nowPrice).toFixed(3))
    }))
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (price < nowPrice && activeModalTab === 0) alert('현재 가격 미만으로는 구매하실 수 없습니다!');
    else {
      setForm({
        Stockname: '',
        price: 0,
        stockNumber: 0,
      });
      // 서버로 전송
      try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/trade/buystock`, {
          form,
          kakaoId: JSON.parse(`${localStorage.getItem('KakaoUser')}`).id
        }, {withCredentials: true});
        console.log('서브밋', res);
        
      } catch (err) {
        console.error(err);
        
      }
      setCountBuy(0);
      // console.log(form);
    }
  };

  const data = stock?.output[29];
  const color = !data ? undefined : (data?.prdy_ctrt.includes('-') ? 'red-text' : 'blue-text');

  const onClickToggleModal = useCallback(() => {
    setOpenTradeModal(!openTradeModal);
  }, [openTradeModal]);

  const nowPrice = (Number(data?.stck_hgpr) + Number(data?.stck_lwpr)) / 2
  
  return (
    <>
      <StockHeaderContainer>
        {openTradeModal && (
          <TradeModal onClickToggleModal={onClickToggleModal} >
            <h2>주식 매수</h2>
            <ul>
              <TabLi $isActive={activeModalTab === 0} onClick={() => {
                setActiveModalTab(0);
                setForm({...form, price: Number(0)}); setCountBuy(1);
                }}>지정가</TabLi>
              <TabLi $isActive={activeModalTab === 1} onClick={() => {
                setActiveModalTab(1);
                // setForm({...form, price: Number(data?.stck_hgpr) * countBuy})
                setForm({...form, price: Number(data?.stck_hgpr)})
                }}>시장가</TabLi>
            </ul>
            <div className="info1">현재 가격: {nowPrice} </div>
            <div className="info1">현재 시장가: {data?.stck_hgpr} </div>
            <form onSubmit={handleSubmit} noValidate>
              <input type="text" name="stockname" value={Stockname} onChange={onChange} hidden />
              {/* 지정가 */}
              <input hidden={activeModalTab !== 0} min={nowPrice} type="number" name="price" value={price} onChange={onChange} />
              <p className="desc" hidden={activeModalTab !== 0}>모의주식이므로 현재 가격 미만에선 구매할 수 없습니다.</p>
              <div className="info1" hidden={activeModalTab !== 0}>구매: {(price / nowPrice).toFixed(3)}주</div>
              {/* 시장가 */}
              <input hidden={activeModalTab !== 1} disabled min={data?.stck_hgpr} type="number" name="price" value={price} onChange={onChange} />
              <p className="desc" hidden={activeModalTab !== 1}>현재 시장가 이상에서 구매할 수 있습니다.</p>
              <div className="btnBox">
                <button className="plusOneBtn cursor-pointer" type="button" hidden={activeModalTab !== 1} onClick={handleBuyPrice}>+{countBuy}주</button>
                <button className="buyBtn cursor-pointer" type="submit">매수하기</button>
              </div>
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