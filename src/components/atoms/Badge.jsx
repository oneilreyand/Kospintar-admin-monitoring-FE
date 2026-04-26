import React from 'react';

const Badge = ({ children, color = 'green', variant = 'solid', rounded = 'full' }) => {
  const colors = {
    green: {
      solid: 'bg-primary text-white',
      outline: 'border border-primary text-primary',
      light: 'bg-primary/10 text-primary',
    },
    blue: {
      solid: 'bg-primary text-white',
      outline: 'border border-primary text-primary',
      light: 'bg-primary/10 text-primary',
    },
    cyan: {
      solid: 'bg-success-500 text-white',
      outline: 'border border-success-500 text-success-700',
      light: 'bg-success-50 text-success-700',
    },
    yellow: {
      solid: 'bg-warning text-white',
      outline: 'border border-warning text-warning-700',
      light: 'bg-warning/10 text-warning-700',
    },
    red: {
      solid: 'bg-danger text-white',
      outline: 'border border-danger text-error-700',
      light: 'bg-danger/10 text-error-700',
    },
    gray: {
      solid: 'bg-navy text-white',
      outline: 'border border-border text-navy',
      light: 'bg-background text-navy',
    },
  };

  const colorStyle = colors[color] || colors.green;
  const variantStyle = colorStyle[variant] || colorStyle.solid;
  const roundedStyle = rounded === 'full' ? 'rounded-full' : 'rounded-md';

  return (
    <span className={`inline-flex items-center px-4 py-1 text-xs font-semibold ${variantStyle} ${roundedStyle}`}>
      {children}
    </span>
  );
};

export default Badge;
