// Validation utility functions

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.trim().replace(/[\s-]/g, ""));
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name.trim()) && name.trim().length >= 2;
};

export const validatePincode = (pincode: string): boolean => {
  const pincodeRegex = /^[0-9]{6}$/;
  return pincodeRegex.test(pincode.trim());
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateDate = (date: string): boolean => {
  if (!date) return false;
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return selectedDate <= today;
};

export const validateIdentityNumber = (identityNumber: string, identityType: string): boolean => {
  if (!identityNumber.trim()) return false;
  
  switch (identityType) {
    case "Aadhaar Card":
      return /^[0-9]{12}$/.test(identityNumber.trim());
    case "PAN Card":
      return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(identityNumber.trim().toUpperCase());
    case "Voter ID":
      return identityNumber.trim().length >= 8;
    default:
      return identityNumber.trim().length > 0;
  }
};

export const validateFile = (file: File, maxSizeMB: number = 5, allowedTypes: string[] = ["pdf", "jpg", "jpeg", "png"]): { valid: boolean; error?: string } => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  
  if (!fileExtension || !allowedTypes.includes(fileExtension)) {
    return {
      valid: false,
      error: `File type not allowed. Allowed types: ${allowedTypes.join(", ").toUpperCase()}`
    };
  }
  
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit`
    };
  }
  
  return { valid: true };
};

