import React from 'react';
import './App.css';
import Main from './components/Main';
import { Route, Routes } from 'react-router-dom';


// React.FunctionComponent:컴포넌트를 리턴
const App:React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      {/* <Route path='/login' element={} */}
    </Routes>
  );
}

export default App;
