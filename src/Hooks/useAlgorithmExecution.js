import { useState, useRef, useCallback } from 'react';
import { ERROR_MESSAGES } from '../constants';

/**
 * Custom hook for managing algorithm execution state
 * Provides loading state, error handling, and execution control
 */
export const useAlgorithmExecution = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [resultReady, setResultReady] = useState(false);
  const speedrunRef = useRef('');

  /**
   * Execute an algorithm with proper state management
   * @param {Function} algorithmFn - The algorithm function to execute
   * @param {Object} options - Execution options
   * @returns {Promise} - Promise that resolves when algorithm completes
   */
  const executeAlgorithm = useCallback(async (algorithmFn, options = {}) => {
    if (isRunning) {
      console.warn('Algorithm is already running');
      return;
    }

    // Reset state
    setError('');
    setResult('');
    setResultReady(false);
    setIsRunning(true);

    try {
      const startTime = performance.now();
      
      // Execute the algorithm
      const algorithmResult = await algorithmFn();
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // Handle result if algorithm returns one
      if (algorithmResult) {
        setResult(algorithmResult);
        setResultReady(true);
      }

      // Log execution time for debugging
      console.log(`Algorithm executed in ${executionTime.toFixed(2)}ms`);

    } catch (algorithmError) {
      console.error('Algorithm execution error:', algorithmError);
      setError(options.errorMessage || ERROR_MESSAGES.ALGORITHM_ERROR);
    } finally {
      setIsRunning(false);
      // Reset speed control
      speedrunRef.current = '';
    }
  }, [isRunning]);

  /**
   * Set speed control for running algorithm
   * @param {string} speed - Speed command ('fast', 'skip', 'normal')
   */
  const setSpeed = useCallback((speed) => {
    speedrunRef.current = speed;
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError('');
  }, []);

  /**
   * Clear result state
   */
  const clearResult = useCallback(() => {
    setResult('');
    setResultReady(false);
  }, []);

  /**
   * Reset all state
   */
  const reset = useCallback(() => {
    setIsRunning(false);
    setError('');
    setResult('');
    setResultReady(false);
    speedrunRef.current = '';
  }, []);

  return {
    // State
    isRunning,
    error,
    result,
    resultReady,
    speedrunRef,
    
    // Actions
    executeAlgorithm,
    setSpeed,
    clearError,
    clearResult,
    reset,
    
    // Direct setters (for compatibility with existing code)
    setResult,
    setResultReady,
  };
};
