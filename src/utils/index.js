/**
 * Utility functions for the Graph Visualizer application
 */

import { VALIDATION_PATTERNS, ERROR_MESSAGES } from '../constants';

/**
 * Validates if a string is a valid node ID
 * @param {string} nodeId - The node ID to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidNodeId = (nodeId) => {
  return typeof nodeId === 'string' && VALIDATION_PATTERNS.NODE_ID.test(nodeId);
};

/**
 * Validates edge input format
 * @param {string} edgeString - The edge string to validate
 * @param {boolean} isWeighted - Whether the graph is weighted
 * @returns {Object} - Validation result with isValid and error properties
 */
export const validateEdgeInput = (edgeString, isWeighted = false) => {
  const trimmed = edgeString.trim();
  
  if (!trimmed) {
    return { isValid: false, error: 'Edge cannot be empty' };
  }

  const pattern = isWeighted ? VALIDATION_PATTERNS.EDGE_WEIGHTED : VALIDATION_PATTERNS.EDGE_UNWEIGHTED;
  const match = trimmed.match(pattern);

  if (!match) {
    return {
      isValid: false,
      error: isWeighted 
        ? 'Invalid weighted edge format. Expected: "node1 node2 weight"'
        : 'Invalid edge format. Expected: "node1 node2"'
    };
  }

  const [, source, target, weight] = match;

  if (!isValidNodeId(source) || !isValidNodeId(target)) {
    return { isValid: false, error: 'Invalid node ID format' };
  }

  if (source === target) {
    return { isValid: false, error: 'Self-loops are not supported' };
  }

  if (isWeighted && (isNaN(weight) || parseFloat(weight) < 0)) {
    return { isValid: false, error: 'Weight must be a non-negative number' };
  }

  return { isValid: true, source, target, weight: isWeighted ? parseFloat(weight) : undefined };
};

/**
 * Validates complete graph input
 * @param {string} input - The complete graph input string
 * @param {boolean} isWeighted - Whether the graph is weighted
 * @returns {Object} - Validation result with isValid, errors, and edges properties
 */
export const validateGraphInput = (input, isWeighted = false) => {
  if (!input || !input.trim()) {
    return { isValid: false, errors: [ERROR_MESSAGES.EMPTY_GRAPH], edges: [] };
  }

  const lines = input.trim().split('\n').map(line => line.trim()).filter(Boolean);
  const errors = [];
  const edges = [];
  const edgeSet = new Set(); // To detect duplicate edges

  lines.forEach((line, index) => {
    const validation = validateEdgeInput(line, isWeighted);
    
    if (!validation.isValid) {
      errors.push(`Line ${index + 1}: ${validation.error}`);
    } else {
      const { source, target, weight } = validation;
      const edgeKey = `${source}-${target}`;
      const reverseEdgeKey = `${target}-${source}`;
      
      // Check for duplicate edges (considering undirected graphs)
      if (edgeSet.has(edgeKey) || edgeSet.has(reverseEdgeKey)) {
        errors.push(`Line ${index + 1}: Duplicate edge detected`);
      } else {
        edgeSet.add(edgeKey);
        edges.push({ source, target, weight });
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    edges
  };
};

/**
 * Debounce function to limit the rate of function calls
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} - The debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit the rate of function calls
 * @param {Function} func - The function to throttle
 * @param {number} limit - The number of milliseconds to limit
 * @returns {Function} - The throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Deep clone an object
 * @param {any} obj - The object to clone
 * @returns {any} - The cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

/**
 * Generate a unique ID
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} - A unique ID
 */
export const generateId = (prefix = 'id') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format algorithm execution time
 * @param {number} milliseconds - Time in milliseconds
 * @returns {string} - Formatted time string
 */
export const formatExecutionTime = (milliseconds) => {
  if (milliseconds < 1000) {
    return `${milliseconds}ms`;
  } else if (milliseconds < 60000) {
    return `${(milliseconds / 1000).toFixed(1)}s`;
  } else {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(1);
    return `${minutes}m ${seconds}s`;
  }
};

/**
 * Check if the current device is mobile
 * @returns {boolean} - True if mobile, false otherwise
 */
export const isMobile = () => {
  return window.innerWidth < 768;
};

/**
 * Get responsive value based on screen size
 * @param {any} mobileValue - Value for mobile screens
 * @param {any} desktopValue - Value for desktop screens
 * @returns {any} - The appropriate value
 */
export const getResponsiveValue = (mobileValue, desktopValue) => {
  return isMobile() ? mobileValue : desktopValue;
};

/**
 * Save data to localStorage with error handling
 * @param {string} key - The storage key
 * @param {any} data - The data to store
 * @returns {boolean} - True if successful, false otherwise
 */
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
};

/**
 * Load data from localStorage with error handling
 * @param {string} key - The storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} - The stored data or default value
 */
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return defaultValue;
  }
};
