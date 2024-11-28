import React from 'react';
import ReactDOM from 'react-dom/client';
import Modal from 'react-modal'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import AnimeFilters from './pages/AnimeFilters';
import AnimeList from './pages/AnimeList';


Modal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
     <Routes>
      <Route path="/" element={<App />} />
      <Route path="/anime_filters" element={<AnimeFilters />} />
      <Route path="/anime_list" element={<AnimeList />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
