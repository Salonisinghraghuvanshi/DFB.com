import React, { useState, useEffect } from 'react';

const SettingsPanel = ({ element, onSave, onClose }) => {
  const [label, setLabel] = useState(element.label);
  const [placeholder, setPlaceholder] = useState(element.placeholder || '');
  const [required, setRequired] = useState(element.required || false);

  useEffect(() => {
    setLabel(element.label);
    setPlaceholder(element.placeholder || '');
    setRequired(element.required || false);
  }, [element]);

  const handleSave = () => {
    onSave({
      ...element,
      label,
      placeholder,
      required,
    });
  };

  return (
    <div className="settings-panel">
      <h5>Edit Element</h5>
      <div className="form-group">
        <label>Label</label>
        <input
          type="text"
          className="form-control"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Placeholder</label>
        <input
          type="text"
          className="form-control"
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />{' '}
          Required
        </label>
      </div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleSave}>Save</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default SettingsPanel;
