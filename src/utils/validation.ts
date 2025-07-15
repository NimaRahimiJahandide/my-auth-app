/**
 * Validates Iranian phone numbers
 * Accepts formats: 09123456789, +989123456789
 */
export const validateIranianPhoneNumber = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[\s-]/g, '');
  
  const patterns = [
    /^09\d{9}$/, // 09123456789
    /^\+989\d{9}$/, // +989123456789
  ];
  
  return patterns.some(pattern => pattern.test(cleanPhone));
};
