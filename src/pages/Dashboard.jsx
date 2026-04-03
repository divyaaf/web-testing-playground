import React, { useState } from 'react';

// Generates 15 random dummy users
const initialUsers = Array.from({ length: 18 }, (_, k) => ({
  id: k + 1,
  name: `User ${k + 1}`,
  email: `user${k + 1}@example.com`,
  role: k % 3 === 0 ? 'Admin' : 'User',
  status: k % 2 === 0 ? 'Active' : 'Inactive'
}));

const Dashboard = () => {
  const [data, setData] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const rowsPerPage = 5;

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    // Adjust pagination if deleted element was the last one on a page
    const totalPages = Math.ceil(newData.length / rowsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  };

  const handleEdit = (id) => {
    alert(`Edit user ${id} functionality is a stub.`);
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const filteredData = sortedData.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const renderSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md" data-testid="dashboard-container">
      <h2 className="text-2xl font-bold mb-4" data-testid="dashboard-heading">User Management Dashboard</h2>
      
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <input 
          type="text" 
          placeholder="Search users..." 
          data-testid="search-input"
          value={search}
          onChange={handleSearch}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/3 mb-2 sm:mb-0"
        />
        <div data-testid="total-users" className="text-gray-600 font-semibold">
          Total Users: {filteredData.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" data-testid="dashboard-table">
          <thead>
            <tr>
              <th className="border-b py-3 px-4 uppercase font-semibold text-sm cursor-pointer hover:bg-gray-50" onClick={() => handleSort('id')} data-testid="table-header-id">
                ID{renderSortIndicator('id')}
              </th>
              <th className="border-b py-3 px-4 uppercase font-semibold text-sm cursor-pointer hover:bg-gray-50" onClick={() => handleSort('name')} data-testid="table-header-name">
                Name{renderSortIndicator('name')}
              </th>
              <th className="border-b py-3 px-4 uppercase font-semibold text-sm cursor-pointer hover:bg-gray-50" onClick={() => handleSort('email')} data-testid="table-header-email">
                Email{renderSortIndicator('email')}
              </th>
              <th className="border-b py-3 px-4 uppercase font-semibold text-sm cursor-pointer hover:bg-gray-50" onClick={() => handleSort('role')} data-testid="table-header-role">
                Role{renderSortIndicator('role')}
              </th>
              <th className="border-b py-3 px-4 uppercase font-semibold text-sm cursor-pointer hover:bg-gray-50" onClick={() => handleSort('status')} data-testid="table-header-status">
                Status{renderSortIndicator('status')}
              </th>
              <th className="border-b py-3 px-4 uppercase font-semibold text-sm" data-testid="table-header-actions">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((user) => (
                <tr key={user.id} data-testid={`row-${user.id}`} className="hover:bg-gray-50">
                  <td className="border-b py-3 px-4" data-testid={`cell-id-${user.id}`}>{user.id}</td>
                  <td className="border-b py-3 px-4" data-testid={`cell-name-${user.id}`}>{user.name}</td>
                  <td className="border-b py-3 px-4" data-testid={`cell-email-${user.id}`}>{user.email}</td>
                  <td className="border-b py-3 px-4" data-testid={`cell-role-${user.id}`}>{user.role}</td>
                  <td className="border-b py-3 px-4" data-testid={`cell-status-${user.id}`}>
                    <span className={`px-2 py-1 rounded text-xs ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="border-b py-3 px-4">
                    <button 
                      onClick={() => handleEdit(user.id)}
                      data-testid={`edit-btn-${user.id}`} 
                      className="text-blue-500 hover:text-blue-700 mr-3"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      data-testid={`delete-btn-${user.id}`} 
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500" data-testid="no-data-message">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          data-testid="pagination-prev"
          className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50"
        >
          Previous
        </button>
        <span data-testid="pagination-info" className="text-sm text-gray-700">
          Page <span data-testid="current-page">{currentPage}</span> of <span data-testid="total-pages">{totalPages || 1}</span>
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage >= totalPages}
          data-testid="pagination-next"
          className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
