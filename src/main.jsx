import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import { DataProviderFuncComp } from './context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <DataProviderFuncComp>
    <App />
    </DataProviderFuncComp>
  </BrowserRouter>,
)
