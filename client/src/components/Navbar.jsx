import { Link, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';

const Navbar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('userInfo');

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  return (
    <nav className="gradient-bg text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wider">
          Entri Elevate CRM
        </Link>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/20 transition-colors">
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          
          {isAuthenticated ? (
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-all">
              <FiLogOut /> Logout
            </button>
          ) : (
            <div className="space-x-3 flex items-center">
              <Link to="/login" className="hover:text-blue-200 transition-colors">Login</Link>
              <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
