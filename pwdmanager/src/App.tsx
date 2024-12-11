import React from 'react';
import './App.css';
import axios from "axios";
import Main from "./components/pages/Main";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer
          position="top-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="dark"
      />

      <BrowserRouter>
        <div className="min-h-screen bg-pwdm-one p-0 m-0">
          <Main/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const PwdmanagerServerInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    params: {}
});
