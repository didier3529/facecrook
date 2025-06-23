import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { OnboardingContext } from './OnboardingContext';

export default function ProfileOnboardingForm() {
  const navigate = useNavigate();
  const { onboardingData, setOnboardingData } = useContext(OnboardingContext);

  const steps = [
    { id: 'basic', title: 'Basic Info', fields: ['username', 'email'] },
    { id: 'profile', title: 'Profile Details', fields: ['bio'] },
    { id: 'preferences', title: 'Preferences', fields: ['avatar'] }
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const [formValues, setFormValues] = useState({
    username: onboardingData.username || '',
    email: onboardingData.email || '',
    bio: onboardingData.bio || '',
    avatar: onboardingData.avatar || ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = () => {
    const currentFields = steps[stepIndex].fields;
    const newErrors = {};
    currentFields.forEach(field => {
      const raw = formValues[field];
      const value = raw && raw.trim();
      if (!value) {
        newErrors[field] = 'This field is required';
      } else if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) newErrors[field] = 'Invalid email address';
      } else if (field === 'avatar') {
        try {
          /* URL constructor will throw if invalid */
          new URL(value);
        } catch {
          newErrors[field] = 'Invalid URL';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    const currentFields = steps[stepIndex].fields;
    const updatedData = currentFields.reduce(
      (acc, field) => ({ ...acc, [field]: formValues[field] }),
      {}
    );
    setOnboardingData(prev => ({ ...prev, ...updatedData }));
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      onFinish();
    }
  };

  const onFinish = () => {
    navigate('/feed');
  };

  const renderFields = () => {
    const fieldId = field => `input-${field}`;
    switch (steps[stepIndex].id) {
      case 'basic':
        return (
          <>
            <div>
              <label htmlFor={fieldId('username')}>Username</label>
              <input
                id={fieldId('username')}
                name="username"
                value={formValues.username}
                onChange={handleChange}
                type="text"
              />
              {errors.username && <span>{errors.username}</span>}
            </div>
            <div>
              <label htmlFor={fieldId('email')}>Email</label>
              <input
                id={fieldId('email')}
                name="email"
                value={formValues.email}
                onChange={handleChange}
                type="email"
              />
              {errors.email && <span>{errors.email}</span>}
            </div>
          </>
        );
      case 'profile':
        return (
          <div>
            <label htmlFor={fieldId('bio')}>Bio</label>
            <textarea
              id={fieldId('bio')}
              name="bio"
              value={formValues.bio}
              onChange={handleChange}
              rows="4"
            />
            {errors.bio && <span>{errors.bio}</span>}
          </div>
        );
      case 'preferences':
        return (
          <div>
            <label htmlFor={fieldId('avatar')}>Avatar URL</label>
            <input
              id={fieldId('avatar')}
              name="avatar"
              value={formValues.avatar}
              onChange={handleChange}
              type="url"
            />
            {errors.avatar && <span>{errors.avatar}</span>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={e => { e.preventDefault(); nextStep(); }}>
      <h2>{steps[stepIndex].title}</h2>
      {renderFields()}
      <div>
        {stepIndex > 0 && (
          <button type="button" onClick={() => setStepIndex(stepIndex - 1)}>
            Back
          </button>
        )}
        <button type="submit">
          {stepIndex < steps.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </form>
  );
}

ProfileOnboardingForm.propTypes = {};