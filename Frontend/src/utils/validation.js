export const validateEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

export const validatePhone = (phone) => {
  return /^\+?[\d\s-]{10,}$/.test(phone);
};

export const validateZipCode = (zip) => {
  return /^\d{6}$/.test(zip);
};

export const validateGeoCoordinates = (lat, lng) => {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    lat >= 0 &&
    lat <= 90 &&
    lng >= 0 &&
    lng <= 180
  );
};

export const validateUserData = (data) => {
  const errors = {};

  // Name validation
  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  }

  // Email validation
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email';
  }

  // Phone validation
  if (!data.phone?.trim()) {
    errors.phone = 'Phone is required';
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number (min 10 digits)';
  }

  // Company validation
  if (!data.company?.trim()) {
    errors.company = 'Company is required';
  }

  // Address validation
  if (!data.address) {
    errors.address = 'Address is required';
  } else {
    const addressErrors = {};

    if (!data.address.street?.trim()) {
      addressErrors.street = 'Street is required';
    }

    if (!data.address.city?.trim()) {
      addressErrors.city = 'City is required';
    }

    if (!data.address.zip?.trim()) {
      addressErrors.zip = 'ZIP code is required';
    } else if (!validateZipCode(data.address.zip)) {
      addressErrors.zip = 'ZIP code must be exactly 6 digits';
    }

    if (!data.address.geo) {
      addressErrors.geo = 'Geo coordinates are required';
    } else {
      const { lat, lng } = data.address.geo;
      if (!validateGeoCoordinates(lat, lng)) {
        addressErrors.geo = 'Invalid coordinates (lat: 0-90, lng: 0-180)';
      }
    }

    if (Object.keys(addressErrors).length > 0) {
      errors.address = addressErrors;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
