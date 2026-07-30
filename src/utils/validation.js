export function validateCitizenRegistration(form) {
  const errors = {};
  const fullName = form.fullName?.trim() || '';
  const email = form.email?.trim().toLowerCase() || '';
  const mobile = form.mobile?.trim() || '';
  const password = form.password || '';
  const confirmPassword = form.confirmPassword || '';
  const state = form.state?.trim() || '';
  const district = form.district?.trim() || '';
  const city = form.city?.trim() || '';
  const address = form.address?.trim() || '';
  const pincode = form.pincode?.trim() || '';
  const identityType = form.identityType || '';
  const identityNumber = form.identityNumber?.trim() || '';

  if (fullName.length < 3) {
    errors.fullName = 'Full name must be at least 3 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!/^\d{10}$/.test(mobile)) {
    errors.mobile = 'Mobile number must contain exactly 10 digits.';
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  if (!passwordRegex.test(password)) {
    errors.password = 'Password must be at least 8 characters with one uppercase, one lowercase, one number, and one special character.';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (!form.gender) {
    errors.gender = 'Please select your gender.';
  }

  if (!form.dob) {
    errors.dob = 'Date of birth is required.';
  } else {
    const birthDate = new Date(form.dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }

    if (birthDate > today) {
      errors.dob = 'Date of birth cannot be in the future.';
    } else if (age < 18) {
      errors.dob = 'You must be at least 18 years old to register.';
    }
  }

  if (!state) {
    errors.state = 'State is required.';
  }

  if (!district) {
    errors.district = 'District is required.';
  }

  if (!city) {
    errors.city = 'City is required.';
  }

  if (!address) {
    errors.address = 'Address is required.';
  }

  if (!/^\d{6}$/.test(pincode)) {
    errors.pincode = 'Pincode must be exactly 6 digits.';
  }

  if (!identityType) {
    errors.identityType = 'Please select a government ID type.';
  } else if (!identityNumber) {
    errors.identityNumber = 'Government ID number is required.';
  } else {
    const patterns = {
      Aadhaar: /^\d{12}$/,
      'Pan Card': /^[A-Z]{5}\d{4}[A-Z]{1}$/,
      'Voter ID': /^[A-Z]{3}[0-9]{7}$/i,
      'Driving License': /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/i,
    };

    if (patterns[identityType] && !patterns[identityType].test(identityNumber)) {
      errors.identityNumber = 'Government ID format does not match the selected ID type.';
    }
  }

  if (!form.terms) {
    errors.terms = 'You must accept the terms and conditions.';
  }

  return errors;
}

export function createCitizenId(userCount) {
  return `JT-CIT-2026-${String(userCount + 1).padStart(6, '0')}`;
}
