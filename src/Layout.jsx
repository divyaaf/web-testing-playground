import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "bg-blue-800 text-white block px-4 py-2 rounded"
      : "text-gray-300 hover:bg-blue-700 hover:text-white block px-4 py-2 rounded transition-colors";
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans" data-testid="layout-container">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col shadow-lg" data-testid="sidebar">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-400 tracking-wider text-center" data-testid="sidebar-logo">QA Playground</h1>
        </div>
        <nav className="flex-1 space-y-2">
          <Link to="/login" className={getLinkClass('/login')} data-testid="nav-login">
            Login
          </Link>
          <Link to="/register" className={getLinkClass('/register')} data-testid="nav-register">
            Register
          </Link>
          <Link to="/dashboard" className={getLinkClass('/dashboard')} data-testid="nav-dashboard">
            Dashboard (Data Table)
          </Link>
          <Link to="/ui-elements" className={getLinkClass('/ui-elements')} data-testid="nav-ui-elements">
            UI Elements (Modals, D&D)
          </Link>
          <Link to="/dynamic-elements" className={getLinkClass('/dynamic-elements')} data-testid="nav-dynamic-elements">
            Dynamic & Tricky Elements
          </Link>
          <Link to="/complex-form" className={getLinkClass('/complex-form')} data-testid="nav-complex-form">
            Complex Forms
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto" data-testid="main-content">
        <header className="mb-8 flex justify-between items-center bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-700" data-testid="page-title">
            Test Capabilities
          </h2>
          <div className="text-sm text-gray-500" data-testid="header-user-info">
            E2E Playground Demo
          </div>
        </header>

        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
