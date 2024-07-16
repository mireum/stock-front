import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Header(): React.ReactElement {
  // const navigate = useNavigate();
  // const location = useLocation();
  const [hasCode, setHasCode] = useState<string | null>(null);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      setHasCode(code);
    }
  }, []);

  useEffect(() => {
    const sendToken = async () => {
      if (hasCode) {
        try {
          const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/kakao`, {
            code: hasCode
          }, {withCredentials: true});
          console.log('성공', res.data);
          
        } catch (err) {
          console.log(err);
          }
      }
    }
    sendToken();
  }, [hasCode]);


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