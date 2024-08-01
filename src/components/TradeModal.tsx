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
  background-color: skyblue;
  z-index: 1;
  text-align: center;

  h2 {
    font-size: 30px;
    font-weight: bold;
  }
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