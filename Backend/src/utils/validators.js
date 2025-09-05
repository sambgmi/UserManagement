
export const isValidEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

export const isEmpty = (str) => {
  return !str || str.trim().length === 0;
};

export const isValidCoordinates = (lat, lng) => {

  if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
    return false;
  }
  
  const isValidLat = lat >= 0 && lat <= 90;
  const isValidLng = lng >= 0 && lng <= 180;
  
  return isValidLat && isValidLng;
};


export const isValidZipCode = (zip) => {
  const zipRegex = /^\d{6}$/;
  return zipRegex.test(zip);
};


export const hasRequiredFields = (obj, fields) => {
  return fields.every(field => {
    if (typeof field === 'string') {
      return obj.hasOwnProperty(field) && !isEmpty(obj[field]);
    }
    if (Array.isArray(field)) {
      const [parent, child] = field;
      return obj[parent] && obj[parent].hasOwnProperty(child) && !isEmpty(obj[parent][child]);
    }
    return false;
  });
};
