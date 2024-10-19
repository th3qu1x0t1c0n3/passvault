import React from 'react';
import './App.css';
import axios from "axios";
import {ToastContainer} from "react-toastify";
import {BrowserRouter} from "react-router-dom";
import Main from "./components/pages/Main";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App bg-black">
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
        <div className="min-h-screen bg-pwdm-one">
          <Main/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const PwdmanagerServerInstance = axios.create({
  // baseURL: 'https://passvault.quixotic.date/api/v1',
  baseURL: 'http://localhost:8087/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  params: {}
});
