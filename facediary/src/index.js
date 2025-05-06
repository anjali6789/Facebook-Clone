import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthContextProvider} from "./context/AuthContext"
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.render(
  <AuthContextProvider>
  <Router>
    <App /></Router>
  </AuthContextProvider>
  
  ,
  document.getElementById("root")
);

