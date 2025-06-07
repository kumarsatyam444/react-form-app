import React, { useState } from 'react';
import './UserForm.css';

const UserForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    countryCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Country and city data
  const countries = [
    { code: 'IN', name: 'India', cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'] },
    { code: 'US', name: 'United States', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'] },
    { code: 'UK', name: 'United Kingdom', cities: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds'] },
    { code: 'CA', name: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'] }
  ];

  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'US/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'Australia' }
  ];

  // Validation regex patterns
  const validationPatterns = {
    name: /^[a-zA-Z\s]{2,30}$/,
    username: /^[a-zA-Z0-9_]{3,20}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    phone: /^[0-9]{10}$/,
    pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    aadhar: /^[0-9]{12}$/
  };

  // Validation function
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return validationPatterns.name.test(value) ? '' : 'Name must be 2-30 characters and contain only letters';
      case 'username':
        return validationPatterns.username.test(value) ? '' : 'Username must be 3-20 characters (letters, numbers, underscore only)';
      case 'email':
        return validationPatterns.email.test(value) ? '' : 'Please enter a valid email address';
      case 'password':
        return validationPatterns.password.test(value) ? '' : 'Password must be 8+ chars with uppercase, lowercase, number & special character';
      case 'phoneNumber':
        return validationPatterns.phone.test(value) ? '' : 'Phone number must be 10 digits';
      case 'country':
        return value ? '' : 'Please select a country';
      case 'city':
        return value ? '' : 'Please select a city';
      case 'panNo':
        return validationPatterns.pan.test(value) ? '' : 'PAN must be in format: ABCDE1234F';
      case 'aadharNo':
        return validationPatterns.aadhar.test(value) ? '' : 'Aadhar must be 12 digits';
      default:
        return '';
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for country change
    if (name === 'country') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        city: '' // Reset city when country changes
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Validate field on change
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Check if form is valid
  const isFormValid = () => {
    const requiredFields = Object.keys(formData);
    return requiredFields.every(field => {
      const value = formData[field];
      return value && !validateField(field, value);
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    
    if (Object.keys(newErrors).length === 0) {
      onFormSubmit(formData);
    }
  };

  const getCitiesForCountry = () => {
    const selectedCountry = countries.find(c => c.name === formData.country);
    return selectedCountry ? selectedCountry.cities : [];
  };

  return (
    <div className="form-container">
      {/* Floating Shapes */}
      <div className="floating-shapes">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="form-wrapper">
        <h2 className="form-title">User Registration Form</h2>
        
        <form onSubmit={handleSubmit} className="user-form">
          {/* Name Fields */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
                placeholder="Enter first name"
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
                placeholder="Enter last name"
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
              placeholder="Enter username"
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter email address"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number *</label>
            <div className="phone-input">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="country-code"
              >
                {countryCodes.map(cc => (
                  <option key={cc.code} value={cc.code}>
                    {cc.code} ({cc.country})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={errors.phoneNumber ? 'error' : ''}
                placeholder="Enter phone number"
              />
            </div>
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

          {/* Country and City */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">Country *</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={errors.country ? 'error' : ''}
              >
                <option value="">Select Country</option>
                {countries.map(country => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && <span className="error-message">{errors.country}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="city">City *</label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? 'error' : ''}
                disabled={!formData.country}
              >
                <option value="">Select City</option>
                {getCitiesForCountry().map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>
          </div>

          {/* PAN and Aadhar */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="panNo">PAN Number *</label>
              <input
                type="text"
                id="panNo"
                name="panNo"
                value={formData.panNo}
                onChange={handleChange}
                className={errors.panNo ? 'error' : ''}
                placeholder="ABCDE1234F"
                style={{ textTransform: 'uppercase' }}
              />
              {errors.panNo && <span className="error-message">{errors.panNo}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="aadharNo">Aadhar Number *</label>
              <input
                type="text"
                id="aadharNo"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleChange}
                className={errors.aadharNo ? 'error' : ''}
                placeholder="123456789012"
                maxLength="12"
              />
              {errors.aadharNo && <span className="error-message">{errors.aadharNo}</span>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`submit-btn ${!isFormValid() ? 'disabled' : ''}`}
            disabled={!isFormValid()}
          >
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
