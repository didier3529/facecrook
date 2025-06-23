import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

const MissingSheetEntryAdder = ({ fields, onAddEntry }) => {
  const initialFormState = useMemo(
    () => fields.reduce((acc, { name }) => ({ ...acc, [name]: '' }), {}),
    [fields]
  );
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormState(initialFormState);
    setErrors({});
  }, [initialFormState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const validationErrors = {};
    fields.forEach(({ name, label, required }) => {
      if (required && !formState[name].trim()) {
        validationErrors[name] = `${label} is required.`;
      }
    });
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAddEntry({ ...formState });
    setFormState(initialFormState);
    setErrors({});
  };

  return (
    <form className="missing-sheet-entry-adder" onSubmit={handleSubmit} noValidate>
      {fields.map(({ name, label, type = 'text', placeholder }) => (
        <div key={name} className="missing-sheet-entry-adder__group">
          <label htmlFor={name} className="missing-sheet-entry-adder__label">
            {label}
          </label>
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder || ''}
            value={formState[name]}
            onChange={handleChange}
            className={`missing-sheet-entry-adder__input${errors[name] ? ' missing-sheet-entry-adder__input--error' : ''}`}
          />
          {errors[name] && (
            <span className="missing-sheet-entry-adder__error">{errors[name]}</span>
          )}
        </div>
      ))}
      <button type="submit" className="missing-sheet-entry-adder__button">
        Add Entry
      </button>
    </form>
  );
};

MissingSheetEntryAdder.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
    })
  ).isRequired,
  onAddEntry: PropTypes.func.isRequired,
};

export default MissingSheetEntryAdder;