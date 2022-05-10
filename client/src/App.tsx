import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApiProvider from './contexts/ApiProvider';
import SignupView from './views/SignupView';
import LoginView from './views/LoginView';
import VerifyView from './views/VerifyView';
import AuthProvider from './contexts/AuthContext';
import ListingView from './views/ListingView';
import HomeView from './views/HomeView';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <ApiProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<HomeView />}/>
              <Route path="/home" element={<HomeView />}/>
              <Route path="/learn-more" />
              <Route path="/login" element={<LoginView />} />
              <Route path="/signup" element={<SignupView />} />
              <Route path="/verify" element={<VerifyView />} />
              <Route path="/set-profile" />
              <Route path="/listing/:id" />
              <Route path="/profile/:id" />
              <Route path="/favorites" />
              <Route path="chats" />
              <Route path="/chats/:id" />
              <Route path="/add-listing" element={<ListingView />} />
            </Routes>
          </AuthProvider>
        </ApiProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
