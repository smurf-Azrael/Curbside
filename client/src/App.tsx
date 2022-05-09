import './App.css';
import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import ApiProvider from './ApiProvider';
import SignupView from './views/SignupView';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path="/"></Route>
          <Route path="/home" />
          <Route path="/learn-more" />
          <Route path="/login" />
          <Route path="/signup" element={<SignupView/>}/>
          <Route path="/verify" />
          <Route path="/set-profile" />
          <Route path="/listing/:id" />
          <Route path="/profile/:id" />
          <Route path="/favorites" />
          <Route path="chats" />
          <Route path="/chats/:id" />
          <Route path="/add-listing" />
        </Routes>
      </ApiProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
