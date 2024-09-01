import React from 'react';

const FormElement = ({ element, index, onDelete, onSettingsOpen, onDragStart, onDrop, onChange }) => {
  const renderInput = () => {
    switch (element.type) {
      case 'email':
        return (
          <input
            type="email"
            className="form-control"
            placeholder={element.placeholder || 'example@example.com'}
            value={element.value}
            onChange={(e) => onChange(element.id, e.target.value)}
            required={element.required}
          />
        );
      case 'text':
        return (
          <input
            type="text"
            className="form-control"
            placeholder={element.placeholder || 'Full Name'}
            value={element.value}
            onChange={(e) => onChange(element.id, e.target.value)}
            required={element.required}
          />
        );
      case 'address':
        return (
          <input
            type="text"
            className="form-control"
            placeholder={element.placeholder || 'Street Address'}
            value={element.value}
            onChange={(e) => onChange(element.id, e.target.value)}
            required={element.required}
          />
        );
      case 'phone':
        return (
          <input
            type="tel"
            className="form-control"
            placeholder={element.placeholder || 'Phone Number'}
            value={element.value}
            onChange={(e) => onChange(element.id, e.target.value)}
            required={element.required}
          />
        );
      case 'date':
        return (
          <input
            type="date"
            className="form-control"
            value={element.value}
            onChange={(e) => onChange(element.id, e.target.value)}
            required={element.required}
          />
        );
      case 'datetime':
        return (
          <input
            type="datetime-local"
            className="form-control"
            value={element.value}
            onChange={(e) => onChange(element.id, e.target.value)}
            required={element.required}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="form-group"
      draggable
      onDragStart={() => onDragStart(index)}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(index);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <label>{element.label}</label>
      {renderInput()}
      <div className="action-buttons">
        <button type="button" className="btn btn-sm btn-light border settings-btn text-light" onClick={() => onSettingsOpen(element.id)}>
          ⚙
        </button>
        <button type="button" className="btn btn-sm btn-dark delete-btn" onClick={() => onDelete(element.id)}>
          🗑
        </button>
      </div>
    </div>
  );
};

export default FormElement;
