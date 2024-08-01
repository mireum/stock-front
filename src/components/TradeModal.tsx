import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  z-index: 1;
`;
const ContentBox = styled.div`
  width: 1000px;
  height: 600px;
  background-color: #FFF;
  z-index: 1;
  text-align: center;
  padding: 30px;

  h2 {
    font-size: 30px;
    font-weight: bold;
    margin-top: 50px;
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
    font-size: 20px;
  }
  li + li { margin-left: 100px; }
  .info1 { padding: 5px; }
  input {
    margin: 20px;
    border: 1px solid black;
    height: 1.5rem;
    font-size: 20px;
  }
  input[type="number"]:disabled {
    background-color: aliceblue;
    font-weight: bold;
  }
  /* 화살표 없애기 */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .desc { font-size: 14px }
  .btnBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .plusOneBtn { margin-top: 20px; font-weight: bold; }
  .buyBtn {
    width: 8rem;
    height: 3rem;
    border: none;
    background-color: #6d9df7;
    border-radius: 7px;
    margin-top: 40px;
    font-size: 18px;
    font-weight: bold;
  }
  /* button {
    background-color: #6d9df7;
  } */
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;

const TradeModal = ({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) => {

    // 매수
    const handleBuyTrade = async () => {
      try {
        // const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/trade/buy`, {
        //   data, 
        // }, {withCredentials:true});
        // console.log('buy::', response);
  
      } catch (err) {
        console.error(err);
      }
    };
    // // 매도
    // const handleTrade = async () => {
    //   try {
    
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
  return (
    <ModalContainer>
            
      {/* <ContentBox>{children}</ContentBox> */}
      <ContentBox>
        {children}
        {/* <h2>주식 매수</h2>
        <div>지정가</div>
        <div>시장가</div>
        <div>
          <input type='number'   />
        </div> */}
      </ContentBox>
      <Backdrop onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        if (onClickToggleModal) onClickToggleModal();}} 
      />


    </ModalContainer>
  );
}

export default TradeModal;