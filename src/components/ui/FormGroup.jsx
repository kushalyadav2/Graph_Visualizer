import React from 'react';

/**
 * FormGroup component for consistent form field layout
 * @param {Object} props - FormGroup props
 * @param {React.ReactNode} props.children - Form field content
 * @param {string} props.label - Field label
 * @param {string} props.description - Field description/help text
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Whether field is required
 * @param {string} props.className - Additional CSS classes
 */
const FormGroup = ({
  children,
  label,
  description,
  error,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
      
      <div className="relative">
        {children}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * RadioGroup component for radio button groups
 */
const RadioGroup = ({ 
  options, 
  value, 
  onChange, 
  name, 
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`} {...props}>
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-2 font-medium cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            className="form-radio text-blue-600 dark:bg-gray-600 dark:border-gray-500 w-4 h-4 focus:ring-blue-500 focus:ring-2"
          />
          <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

/**
 * Input component with consistent styling
 */
const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';
  const normalClasses = 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100';
  const errorClasses = 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20';
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  const classes = `${baseClasses} ${error ? errorClasses : normalClasses} ${disabled ? disabledClasses : ''} ${className}`;
  
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={classes}
      {...props}
    />
  );
};

/**
 * Textarea component with consistent styling
 */
const Textarea = ({
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  rows = 4,
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y';
  const normalClasses = 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100';
  const errorClasses = 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20';
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  const classes = `${baseClasses} ${error ? errorClasses : normalClasses} ${disabled ? disabledClasses : ''} ${className}`;
  
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      rows={rows}
      className={classes}
      {...props}
    />
  );
};

// Export components
FormGroup.RadioGroup = RadioGroup;
FormGroup.Input = Input;
FormGroup.Textarea = Textarea;

export default FormGroup;
