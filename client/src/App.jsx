import React from 'react'
import Login from './components/homecomponent/Login'
import Signup from './components/homecomponent/Signup'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Budget from './components/dashboardcomp/Budget';
import PortfolioChart from './components/dashboardcomp/Investment';
import Investment from './components/dashboardcomp/Investment';
import Transactions from './components/dashboardcomp/Transactions';
import FinancialGoals from './components/dashboardcomp/Financialgoals';
import Settings from './components/dashboardcomp/Settings';

function App() {
  return (
    <div>
      <Router>
      
      <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/budgets' element={<Budget/>}/>
      <Route path='/investments' element={< Investment/>} />
      <Route path='/transactions' element={<Transactions/>}/>
      <Route path='/goals' element={<FinancialGoals/>}/>
      <Route path='/settings' element={<Settings/>}/>
      
      
      </Routes>  
      </Router>
    </div>
  )
}

export default App
