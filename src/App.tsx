import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/register.page';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<RegisterPage></RegisterPage>}></Route>
        <Route path='verifyemail'>
          <Route path=':verificationCode' ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
