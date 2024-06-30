import React from 'react';
import './App.css';
import Main from './components/Main';


// React.FunctionComponent:컴포넌트를 리턴
const App:React.FC = () => {
  return (
    <div className="App">
      모의주식 웹입니다.
      <Main />
    </div>
  );
}

export default App;
