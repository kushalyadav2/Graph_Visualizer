import React from 'react';

/**
 * Reusable Card component for consistent layout containers
 * @param {Object} props - Card props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.padding - Padding variant: 'none', 'sm', 'md', 'lg'
 * @param {boolean} props.shadow - Whether to show shadow
 * @param {boolean} props.border - Whether to show border
 */
const Card = ({
  children,
  className = '',
  padding = 'md',
  shadow = true,
  border = true,
  ...props
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl transition-colors';
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  const shadowClass = shadow ? 'shadow-lg hover:shadow-xl transition-shadow' : '';
  const borderClass = border ? 'border border-gray-200 dark:border-gray-700' : '';
  
  const classes = `${baseClasses} ${paddingClasses[padding]} ${shadowClass} ${borderClass} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

/**
 * Card Header component
 */
const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card Title component
 */
const CardTitle = ({ children, className = '', ...props }) => (
  <h2 className={`text-xl font-semibold text-gray-900 dark:text-gray-100 ${className}`} {...props}>
    {children}
  </h2>
);

/**
 * Card Content component
 */
const CardContent = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card Footer component
 */
const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 ${className}`} {...props}>
    {children}
  </div>
);

// Export all components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
