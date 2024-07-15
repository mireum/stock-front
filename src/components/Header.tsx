import React from 'react';

function Header(): React.ReactElement {
  // const navigate = useNavigate();
  // const location = useLocation();

  return (
    <div>
      {/* <button onClick={() => navigate(`/login`)}>카카오톡 로그인</button> */}
      <button onClick={() =>
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`
      }>카카오톡 로그인</button>
    </div>
  );
}

export default Header;