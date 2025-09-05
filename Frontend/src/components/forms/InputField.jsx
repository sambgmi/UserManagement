import React from 'react';

const InputField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  placeholder, 
  required = false 
}) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default InputField;
