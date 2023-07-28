import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { NotFound } from './pages/NotFound';
import { LoginPage } from './pages/LoginPage';
import { VendingMachinePage } from './pages/VendingMachine';


function App() {
  return (

		<BrowserRouter>
	    <Routes>
	      <Route path="/" element={<LoginPage/>} />
	      <Route path="/vending-machine" element={<VendingMachinePage/>} />
          <Route path="*" element={<NotFound />} />
	    </Routes>
		</BrowserRouter>

  );
}

export default App;
