import React from 'react';
import ComplientForm from '../components/complientForm';

const ComplienterPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Complienter Dashboard</h1>
          <p className="text-sm mt-1">Manage and create new complients easily</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create a New Complient</h2>
          <ComplientForm />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 Complient System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ComplienterPage;