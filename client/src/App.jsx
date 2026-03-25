import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Userdata from './pages/Userdata';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isAuthenticated = !!localStorage.getItem('userInfo');

  return (
    <BrowserRouter>
      <div className="min-h-screen transition-colors duration-300 w-full">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Userdata /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
