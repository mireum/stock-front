import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { User } from '../model/Model';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.div`
  background-color: aliceblue;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 10px 6px; */

  .title {
    text-align: center;
    width: 100px;
    height: 40px;
    background-color: antiquewhite;
    font-size: 26px;
    font-weight: bold;

    a:first-child {
      vertical-align: middle;
    }
  }

  .loginBox {

  }
`;

function Header(): React.ReactElement {
  const navigate = useNavigate();

  const [hasCode, setHasCode] = useState<string | null>(null);
  const [kakaoUser, setKakaoUser] = useState<User | null>(
    !JSON.parse(`${localStorage.getItem('KakaoUser')}`)
    ? null
    : JSON.parse(`${localStorage.getItem('KakaoUser')}`)
  );

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      setHasCode(code);
    }
  }, []);

  useEffect(() => {
    const sendToken = async () => {
      if (hasCode && !localStorage.getItem('KakaoUser')) {
        try {
          const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/kakao`, {
            code: hasCode
          }, {withCredentials: true});
          console.log('성공', res.data.response);
          setKakaoUser(res.data.response);
          // 새로고침 방지
          localStorage.setItem('KakaoUser', JSON.stringify(res.data.response));
        } catch (err) {
          console.log(err);
          }
      }
    }
    sendToken();
  }, [hasCode]);


  return (
    <HeaderContainer>
      <div className='title cursor-pointer' onClick={() => {navigate('/')}}>
        <a className=''>주식쿨</a>
      </div>
      <div className='loginBox'>
        {!kakaoUser
        ? 
        <button onClick={() =>
          window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`}>
          <img src='./image/kakao_login_small.png' alt='카카오 로그인 아이콘'/>
        </button>

        : <>
            <img src="http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R110x110" alt="카카오톡 썸네일" width="50" height="50" />
            <div>{kakaoUser.nickname} 님</div>
            {/* 로그아웃할 때 토큰이랑 KakaoUser localstorage 삭제할 것 */}
            <button>로그아웃</button>
          </>
        }
      </div>
    </HeaderContainer>
  );
}

export default Header;