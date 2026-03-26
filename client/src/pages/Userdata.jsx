import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

const Userdata = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', status: 'Active' });
  const [editingId, setEditingId] = useState(null);

  const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchCustomers = async () => {
    try {
      if (!token) return;
      const { data } = await axios.get('https://mern-integration-a14-m5-entri-elevate.onrender.com/api/customers', config);
      setCustomers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://mern-integration-a14-m5-entri-elevate.onrender.com/api/customers/${editingId}`, formData, config);
      } else {
        await axios.post('https://mern-integration-a14-m5-entri-elevate.onrender.com/api/customers', formData, config);
      }
      setIsModalOpen(false);
      setFormData({ name: '', email: '', phone: '', company: '', status: 'Active' });
      setEditingId(null);
      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await axios.delete(`https://mern-integration-a14-m5-entri-elevate.onrender.com/api/customers/${id}`, config);
        fetchCustomers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openEditModal = (customer) => {
    setFormData(customer);
    setEditingId(customer._id);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Customer Data</h2>
        <button
          onClick={() => {
            setFormData({ name: '', email: '', phone: '', company: '', status: 'Active' });
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors font-medium border-none outline-none"
        >
          <FiPlus /> Add Customer
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <th className="p-3 border-b dark:border-gray-600 rounded-tl-md">Name</th>
              <th className="p-3 border-b dark:border-gray-600">Email</th>
              <th className="p-3 border-b dark:border-gray-600">Phone</th>
              <th className="p-3 border-b dark:border-gray-600">Company</th>
              <th className="p-3 border-b dark:border-gray-600">Status</th>
              <th className="p-3 border-b dark:border-gray-600 text-center rounded-tr-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b dark:border-gray-700 text-gray-800 dark:text-gray-200">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3">{c.company}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${
                    c.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    c.status === 'Lead' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-3 flex justify-center gap-4">
                  <button onClick={() => openEditModal(c)} className="text-blue-500 hover:text-blue-700 transition-colors">
                    <FiEdit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(c._id)} className="text-red-500 hover:text-red-700 transition-colors">
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 italic">
            No customers found. Click on Add Customer to create one!
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {editingId ? 'Edit Customer' : 'Add New Customer'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" required className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input type="email" placeholder="Email Address" required className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <input type="text" placeholder="Phone Number" required className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              <input type="text" placeholder="Company Name" required className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
              <select className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                <option value="Active">Active</option>
                <option value="Lead">Lead</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-md font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-md font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm cursor-pointer border-none outline-none">
                  {editingId ? 'Save Changes' : 'Create Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userdata;
