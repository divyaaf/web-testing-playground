import React, { useState } from 'react';

const UiElements = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [todoItems, setTodoItems] = useState([
    { id: 'item-1', text: 'Write Tests' },
    { id: 'item-2', text: 'Refactor Code' },
  ]);
  const [doneItems, setDoneItems] = useState([
    { id: 'item-3', text: 'Setup Deployment' },
  ]);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, item, source) => {
    setDraggedItem({ ...item, source });
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (draggedItem.source !== targetColumn) {
      if (draggedItem.source === 'todo') {
        setTodoItems(todoItems.filter(item => item.id !== draggedItem.id));
        setDoneItems([...doneItems, { id: draggedItem.id, text: draggedItem.text }]);
      } else {
        setDoneItems(doneItems.filter(item => item.id !== draggedItem.id));
        setTodoItems([...todoItems, { id: draggedItem.id, text: draggedItem.text }]);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md" data-testid="ui-elements-container">
      <h2 className="text-2xl font-bold mb-6" data-testid="ui-elements-heading">UI Elements Playground</h2>

      {/* Modal Section */}
      <section className="mb-10 border-b pb-8">
        <h3 className="text-xl font-semibold mb-4" data-testid="modal-section-heading">Modal Dialog</h3>
        <button
          onClick={() => setModalOpen(true)}
          data-testid="open-modal-btn"
          className="bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 focus:outline-none"
        >
          Open Modal
        </button>

        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-testid="modal-overlay">
            <div className="bg-white rounded-lg p-6 w-96 shadow-xl" data-testid="modal-content">
              <h4 className="text-lg font-bold mb-4" data-testid="modal-title">Confirm Action</h4>
              <p className="text-gray-600 mb-6" data-testid="modal-body">Are you sure you want to perform this action?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setModalOpen(false)}
                  data-testid="modal-cancel-btn"
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Action Confirmed!');
                    setModalOpen(false);
                  }}
                  data-testid="modal-confirm-btn"
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Tooltip Section */}
      <section className="mb-10 border-b pb-8">
        <h3 className="text-xl font-semibold mb-4" data-testid="tooltip-section-heading">Hover & Tooltip</h3>
        <div className="group relative inline-block">
          <button data-testid="tooltip-trigger-btn" className="px-4 py-2 bg-gray-800 text-white rounded">
            Hover over me
          </button>
          <div 
            data-testid="tooltip-content"
            className="absolute hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max"
          >
            This is hidden tooltip text!
          </div>
        </div>
      </section>

      {/* Drag and Drop Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4" data-testid="dnd-section-heading">Drag and Drop</h3>
        <div className="flex flex-col md:flex-row gap-6">
          {/* TO DO Column */}
          <div 
            className="flex-1 min-h-[200px] p-4 bg-gray-100 rounded border-2 border-dashed border-gray-300"
            data-testid="dnd-column-todo"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'todo')}
          >
            <h4 className="font-bold mb-4 text-gray-700" data-testid="todo-column-header">To Do</h4>
            {todoItems.map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item, 'todo')}
                onDragEnd={handleDragEnd}
                data-testid={`draggable-${item.id}`}
                className="bg-white p-3 mb-2 rounded shadow cursor-move border hover:border-blue-500 transition-colors"
              >
                {item.text}
              </div>
            ))}
            {todoItems.length === 0 && (
              <p className="text-gray-400 text-sm" data-testid="todo-empty">No items</p>
            )}
          </div>

          {/* DONE Column */}
          <div 
            className="flex-1 min-h-[200px] p-4 bg-gray-100 rounded border-2 border-dashed border-gray-300"
            data-testid="dnd-column-done"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'done')}
          >
            <h4 className="font-bold mb-4 text-gray-700" data-testid="done-column-header">Done</h4>
            {doneItems.map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item, 'done')}
                onDragEnd={handleDragEnd}
                data-testid={`draggable-${item.id}`}
                className="bg-white p-3 mb-2 rounded shadow cursor-move border hover:border-green-500 transition-colors"
              >
                {item.text}
              </div>
            ))}
            {doneItems.length === 0 && (
              <p className="text-gray-400 text-sm" data-testid="done-empty">No items</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UiElements;
