import React, { useState, useEffect } from 'react';

const DynamicElements = () => {
  const [dynamicId, setDynamicId] = useState(`btn-start-${Math.floor(Math.random() * 9999)}`);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    // Generate new ID on mount
    setDynamicId(`btn-submit-${Math.floor(Math.random() * 9999)}`);

    // Disappearing element
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartProcess = () => {
    setProgress(0);
    setShowSuccess(false);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 400);

    setTimeout(() => {
      setShowSuccess(true);
    }, 5000); // exactly 5 seconds
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md" data-testid="dynamic-elements-container">
      {/* Disappearing Element */}
      {showNotification && (
        <div 
          className="bg-yellow-100 text-yellow-800 p-4 rounded mb-6 flex justify-between items-center" 
          data-testid="disappearing-banner"
        >
          <span>This notification will disappear in 3 seconds.</span>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6" data-testid="dynamic-elements-heading">Dynamic Elements</h2>

      {/* Dynamic ID Button */}
      <section className="mb-10 border-b pb-8">
        <h3 className="text-xl font-semibold mb-4" data-testid="dynamic-id-section-heading">Dynamic ID Button</h3>
        <p className="text-sm text-gray-600 mb-4">
          The button below changes its ID every time the page refreshes.
        </p>
        {/* Intentionally missing data-testid */}
        <button 
          id={dynamicId}
          className="bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none"
          onClick={() => alert(`Button clicked with ID: ${dynamicId}`)}
        >
          Dynamic Button
        </button>
      </section>

      {/* Delayed Element */}
      <section>
        <h3 className="text-xl font-semibold mb-4" data-testid="delayed-element-section-heading">Delayed Element</h3>
        <button 
          onClick={handleStartProcess}
          data-testid="start-process-btn"
          className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none mb-4"
        >
          Start Process
        </button>
        
        {progress > 0 && progress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4" data-testid="progress-bar-container">
            <div 
              className="bg-green-600 h-2.5 rounded-full transition-all" 
              style={{ width: `${progress}%` }}
              data-testid="progress-bar-fill"
            ></div>
          </div>
        )}

        {showSuccess && (
          <div 
            className="bg-green-100 text-green-700 p-3 rounded mt-4" 
            data-testid="delayed-success-message"
          >
            Process Completed Successfully!
          </div>
        )}
      </section>
    </div>
  );
};

export default DynamicElements;
