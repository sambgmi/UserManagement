import { isValidEmail, isValidPhone, isEmpty, isValidCoordinates, isValidZipCode, hasRequiredFields } from '../utils/validators.js';


export const validateUser = (req, res, next) => {
  const { name, email, phone, company, address } = req.body;
  const errors = [];


  if (!name?.trim()) {
    errors.push("Name is required");
  }

  
  if (isEmpty(email)) {
    errors.push("Email is required");
  } else if (!isValidEmail(email)) {
    errors.push("Please enter a valid email address");
  }

  
  if (isEmpty(phone)) {
    errors.push("Phone number is required");
  } else if (!isValidPhone(phone)) {
    errors.push("Please enter a valid phone number");
  }


  if (!company?.trim()) {
    errors.push("Company name is required");
  }

 
  if (!address) {
    errors.push("Address is required");
  } else {
    if (!address.street?.trim()) {
      errors.push("Street address is required");
    }
    if (!address.city?.trim()) {
      errors.push("City is required");
    }
    if (isEmpty(address.zip)) {
      errors.push("ZIP code is required");
    } else if (!isValidZipCode(address.zip)) {
      errors.push("ZIP code must be exactly 6 digits");
    }
    if (!address.geo) {
      errors.push("Geo coordinates are required");
    } else {
      const { lat, lng } = address.geo;
      
      if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
        errors.push("Latitude and longitude must be valid numbers");
      } else {
        if (lat < 0 || lat > 90) {
          errors.push("Latitude must be between 0 and 90 degrees");
        }
        if (lng < 0 || lng > 180) {
          errors.push("Longitude must be between 0 and 180 degrees");
        }
      }
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(", ") });
  }

  next();
};


export const validatePartialUpdate = (req, res, next) => {
  const { email, address } = req.body;
  const errors = [];


  if (email !== undefined) {
    if (!email?.trim()) {
      errors.push("Email cannot be empty");
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.push("Please enter a valid email address");
    }
  }

  
  if (address) {
    if (address.street === "") {
      errors.push("Street address cannot be empty");
    }
    if (address.city === "") {
      errors.push("City cannot be empty");
    }
    if (address.zip === "") {
      errors.push("ZIP code cannot be empty");
    }
    if (address.geo) {
      if (address.geo.lat !== undefined && typeof address.geo.lat !== 'number') {
        errors.push("Latitude must be a number");
      }
      if (address.geo.lng !== undefined && typeof address.geo.lng !== 'number') {
        errors.push("Longitude must be a number");
      }
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(", ") });
  }

  next();
};
