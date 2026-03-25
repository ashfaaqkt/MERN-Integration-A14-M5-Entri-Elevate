import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">Login</h2>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input type="email" required className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
          <input type="password" required className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors font-semibold">
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
        Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
      </p>
    </div>
  );
};

export default Login;
