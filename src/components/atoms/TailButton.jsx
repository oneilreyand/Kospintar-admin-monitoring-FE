function TailButton({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon = null,
  rightIcon = null,
  className = '',
  ...props
}) {
  const sizeClasses = {
    md: 'px-4 py-3',
    lg: 'px-5 py-3.5',
  };

  const variantClasses = {
    primary: 'bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600',
    secondary: 'bg-white text-gray-700 shadow-theme-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
  };

  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-lg text-sm font-medium transition ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className}`.trim()}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

export default TailButton;
