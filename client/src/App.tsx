import './App.css';
import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/"><Navigate to="/home" /></Route>
          <Route path="/home" />
          <Route path="/learn-more" />
          <Route path="/login" />
          <Route path="/signup" />
          <Route path="/verify" />
          <Route path="/set-profile" />
          <Route path="/listing/:id" />
          <Route path="/profile/:id" />
          <Route path="/favorites" />
          <Route path="chats" />
          <Route path="/chats/:id" />
          <Route path="/add-listing" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
