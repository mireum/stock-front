import React from 'react';
import {useNavigate } from 'react-router-dom';

function Header(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(`/signin`)}>회원가입</button>
      <button onClick={() => navigate(`/login`)}>로그인</button>
    </div>
  );
}

export default Header;