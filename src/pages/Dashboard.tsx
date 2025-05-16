import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Sair
        </button>
      </header>

      <main className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Bem-vindo ao seu painel!</h2>
        <p className="text-gray-700">
          Aqui você pode colocar as informações principais do seu app, gráficos, ou o que for necessário.
        </p>
        {/* Example of a simple dashboard card layout */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-500 text-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-bold">Usuários</h3>
            <p className="text-3xl mt-2">123</p>
          </div>
          <div className="bg-green-500 text-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-bold">Vendas</h3>
            <p className="text-3xl mt-2">456</p>
          </div>
          <div className="bg-yellow-500 text-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-bold">Feedbacks</h3>
            <p className="text-3xl mt-2">78</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
