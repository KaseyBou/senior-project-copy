import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
//import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';

//Pages
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard'
import Budget from './pages/Budget/Budget'
import Expenses from './pages/Expenses/Expenses'
import Savings from './pages/Savings/Savings'
import Income from './pages/Income/Income'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Report from './pages/Report/Report'
import Account from './pages/Account/Account'
import Deposits from './pages/Deposits/Deposits'
import BankAccounts from './pages/BankAccounts/BankAccounts'

//Navigation Routing for Website
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="" element={<App />}>
            <Route index element={<Home />}/>
            <Route path="/Dashboard" element={<Dashboard />}/>
            <Route path="/Budget" element={<Budget />}/>
            <Route path="/Expenses" element={<Expenses />}/>
            <Route path="/Savings" element={<Savings />}/>
            <Route path="/Income" element={<Income />}/>
            <Route path="/Deposits" element={<Deposits />}/>
            <Route path="/BankAccounts" element={<BankAccounts />}/>
            <Route path="/Report" element={<Report />}/>
            <Route path="/Register" element={<Register />}/>
            <Route path="/Login" element={<Login />}/>
            <Route path="/Account" element={<Account />}/>
          </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
