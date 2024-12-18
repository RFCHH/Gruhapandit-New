import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow">
        <Navbar />
      </header>

      <div className="flex flex-1 overflow-hidden ">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-100 ">
          {children}
        </main>
      </div>
      
      <footer className="bg-white shadow p-2">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
