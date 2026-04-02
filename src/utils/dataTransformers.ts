/**
 * Utility functions for safely transforming data types from API responses
 */

/**
 * Safely converts a value to boolean, handling string representations
 * @param value - The value to convert (can be boolean, string, number, or any other type)
 * @returns boolean - The converted boolean value
 */
export function safeBoolean(value: any): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  
  if (typeof value === 'string') {
    const lowerValue = value.toLowerCase().trim();
    return lowerValue === 'true' || lowerValue === '1' || lowerValue === 'yes';
  }
  
  if (typeof value === 'number') {
    return value !== 0;
  }
  
  return Boolean(value);
}

/**
 * Safely transforms user data by converting known boolean fields
 * @param userData - The user data object from API
 * @returns The transformed user data with proper boolean types
 */
export function transformUserData(userData: any): any {
  if (!userData || typeof userData !== 'object') {
    return userData;
  }
  
  const transformed = { ...userData };
  
  // List of known boolean fields that might come as strings
  const booleanFields = [
    'is_pin_set',
    'use2fa',
    'is_active',
    'is_verified',
    'is_blocked',
    'is_suspended',
    'is_deleted',
    'is_admin',
    'is_super_admin',
    'has_profile',
    'is_online',
    'is_premium',
    'is_subscribed',
    'email_verified',
    'phone_verified',
    'kyc_verified',
    'two_factor_enabled',
    'pin_set',
    'biometric_enabled',
    'deleted'
  ];
  
  // Transform boolean fields silently
  booleanFields.forEach(field => {
    if (field in transformed) {
      transformed[field] = safeBoolean(transformed[field]);
    }
  });
  
  // Handle paymentMethod - convert object to string if needed
  if ('paymentMethod' in transformed && transformed.paymentMethod !== null && transformed.paymentMethod !== undefined) {
    if (typeof transformed.paymentMethod === 'object') {
      // If it's an object, try to extract a meaningful string value
      // Common patterns: { type: 'card' }, { method: 'wallet' }, etc.
      transformed.paymentMethod = transformed.paymentMethod.type || 
                                   transformed.paymentMethod.method || 
                                   transformed.paymentMethod.name ||
                                   JSON.stringify(transformed.paymentMethod);
    } else if (typeof transformed.paymentMethod !== 'string') {
      // Convert to string if it's not already
      transformed.paymentMethod = String(transformed.paymentMethod);
    }
  }
  
  // Handle defaultCurrency - ensure it's a string
  if ('defaultCurrency' in transformed && transformed.defaultCurrency !== null && transformed.defaultCurrency !== undefined) {
    if (typeof transformed.defaultCurrency === 'object') {
      transformed.defaultCurrency = transformed.defaultCurrency.code || 
                                     transformed.defaultCurrency.symbol ||
                                     JSON.stringify(transformed.defaultCurrency);
    } else if (typeof transformed.defaultCurrency !== 'string') {
      transformed.defaultCurrency = String(transformed.defaultCurrency);
    }
  }
  
  return transformed;
}

/**
 * Recursively transforms all boolean fields in an object
 * @param obj - The object to transform
 * @returns The transformed object
 */
export function transformAllBooleanFields(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => transformAllBooleanFields(item));
  }
  
  if (typeof obj === 'object') {
    const transformed: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string' && (value === 'true' || value === 'false')) {
        // Convert string booleans to actual booleans
        transformed[key] = value === 'true';
      } else if (typeof value === 'object' && value !== null) {
        // Recursively transform nested objects
        transformed[key] = transformAllBooleanFields(value);
      } else {
        transformed[key] = value;
      }
    }
    return transformed;
  }
  
  return obj;
}

/**
 * Safely decodes user data from API response
 * @param response - The API response data
 * @returns The decoded and transformed user data
 */
export function safeDecodeUser(response: any): any {
  try {
    if (!response) return null;
    
    // If response has a data property, extract it
    const userData = response.data || response;
    
    // Transform the user data to handle boolean fields
    return transformUserData(userData);
  } catch (error) {
    // Return a safe fallback without logging errors
    return null;
  }
}
