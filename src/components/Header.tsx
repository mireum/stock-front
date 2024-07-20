import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { User } from '../model/Model';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import kakao_login_small from '../image/kakao_login_small.png';

const HeaderContainer = styled.div`
  height: 70px;
  background-color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    text-align: center;
    width: 100px;
    height: 40px;
    font-size: 26px;
    font-weight: bold;

    a:first-child {
      vertical-align: middle;
    }
  }

  .loginBox {
    .loginButton {
      border: none;
      background-color: #fff;
    }

    .profileBox {
      width: 230px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 10px 6px;

      .logoutButton {
        border-radius: 5px;
        border: 1px solid #aaa;
      }
    }
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

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/kakaoLogout`, {}, {withCredentials:true});
      console.log(response);
      localStorage.removeItem('KakaoUser');
      setHasCode(null);
      navigate('/');
      window.location.reload();
      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      setHasCode(code);
    }
  }, [hasCode]);

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
        <button className='loginButton cursor-pointer' type='button' onClick={() =>
          window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`}>
          <img src={kakao_login_small} alt='카카오 로그인 아이콘' />
        </button>
        : <div className='profileBox'>
            <img src={kakaoUser.thumbnail_image} alt="카카오톡 썸네일" width="50" height="50" />
            <div>{kakaoUser.nickname} 님</div>
            <button className='logoutButton' onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        }
      </div>
    </HeaderContainer>
  );
}

export default Header;