// App.jsx
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import FollowCursor from './Component/Coursor';
import Navbar from './Component/Navbar';
import Chat from './Page/Chat';
import Home from './Page/Home';

// App Component
const App = () => {
  return (
    <Router>
      <Navbar/>
      <FollowCursor/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;