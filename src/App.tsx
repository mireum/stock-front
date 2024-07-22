import React from 'react';
import './App.css';
import Main from './components/Main';
import { Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    box-sizing:  border-box;
    margin: 0 auto;
  }

  * {
    box-sizing: inherit;
  }

  .cursor-pointer {
    cursor: pointer;
  }
  .red-text {
    color: red;
  }

  .green-text {
    color: green;
  }
`;

// React.FunctionComponent:컴포넌트를 리턴
const App:React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
