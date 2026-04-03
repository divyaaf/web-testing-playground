import React, { useState } from 'react';

const locationsData = {
  USA: {
    California: ['Los Angeles', 'San Francisco', 'San Diego'],
    Texas: ['Houston', 'Austin', 'Dallas'],
    NewYork: ['New York City', 'Buffalo', 'Rochester']
  },
  Indonesia: {
    JawaBarat: ['Bandung', 'Bogor', 'Bekasi'],
    DKIJakarta: ['Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Utara'],
    Bali: ['Denpasar', 'Kuta', 'Ubud']
  },
  UK: {
    England: ['London', 'Manchester', 'Birmingham'],
    Scotland: ['Edinburgh', 'Glasgow', 'Aberdeen']
  }
};

const ComplexForm = () => {
  const [file, setFile] = useState(null);
  const [country, setCountry] = useState('');
  const [stateProv, setStateProv] = useState('');
  const [city, setCity] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setStateProv('');
    setCity('');
  };

  const handleStateChange = (e) => {
    setStateProv(e.target.value);
    setCity('');
  };

  const states = country ? Object.keys(locationsData[country] || {}) : [];
  const cities = stateProv ? locationsData[country]?.[stateProv] || [] : [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md" data-testid="complex-form-container">
      <h2 className="text-2xl font-bold mb-6" data-testid="complex-form-heading">Complex Forms Playground</h2>

      {/* File Upload Section */}
      <section className="mb-10 border-b pb-8">
        <h3 className="text-xl font-semibold mb-4" data-testid="file-upload-section-heading">File Upload</h3>
        <div className="flex items-center space-x-4">
          <label 
            htmlFor="file-upload" 
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none flex items-center"
            data-testid="file-upload-label"
          >
            Choose File
          </label>
          <input 
            id="file-upload" 
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
            data-testid="file-upload-input"
          />
          {file ? (
            <span className="text-gray-700 font-medium" data-testid="file-name-display">{file.name}</span>
          ) : (
            <span className="text-gray-500" data-testid="no-file-text">No file chosen</span>
          )}
        </div>
      </section>

      {/* Interdependent Dropdowns Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4" data-testid="dropdowns-section-heading">Interdependent Dropdowns</h3>
        <form className="space-y-4 max-w-lg" data-testid="dropdown-form">
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="country" data-testid="country-label">Country</label>
            <select 
              id="country" 
              value={country} 
              onChange={handleCountryChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="country-dropdown"
            >
              <option value="" disabled data-testid="country-option-default">Select Country</option>
              {Object.keys(locationsData).map(c => (
                <option key={c} value={c} data-testid={`country-option-${c}`}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="state" data-testid="state-label">State/Province</label>
            <select 
              id="state" 
              value={stateProv} 
              onChange={handleStateChange}
              disabled={!country}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
              data-testid="state-dropdown"
            >
              <option value="" disabled data-testid="state-option-default">Select State</option>
              {states.map(s => (
                <option key={s} value={s} data-testid={`state-option-${s}`}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="city" data-testid="city-label">City</label>
            <select 
              id="city" 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
              disabled={!stateProv}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
              data-testid="city-dropdown"
            >
              <option value="" disabled data-testid="city-option-default">Select City</option>
              {cities.map(c => (
                <option key={c} value={c} data-testid={`city-option-${c.replace(/\s+/g, '-')}`}>{c}</option>
              ))}
            </select>
          </div>
          
        </form>
      </section>
    </div>
  );
};

export default ComplexForm;
