import React from 'react';

const Badge = ({ children, color = 'blue', variant = 'solid', rounded = 'full' }) => {
  const colors = {
    blue: {
      solid: 'bg-[#3C50E0] text-white',
      outline: 'border border-[#3C50E0] text-[#3C50E0]',
      light: 'bg-[#E0E7FF] text-[#3C50E0]',
    },
    cyan: {
      solid: 'bg-[#10B981] text-white',
      outline: 'border border-[#10B981] text-[#10B981]',
      light: 'bg-[#DCFCE7] text-[#10B981]',
    },
    yellow: {
      solid: 'bg-[#F2994A] text-white',
      outline: 'border border-[#F2994A] text-[#F2994A]',
      light: 'bg-[#FEF3C7] text-[#F2994A]',
    },
    red: {
      solid: 'bg-[#D34053] text-white',
      outline: 'border border-[#D34053] text-[#D34053]',
      light: 'bg-[#FEE2E2] text-[#D34053]',
    },
    gray: {
      solid: 'bg-[#64748B] text-white',
      outline: 'border border-[#64748B] text-[#64748B]',
      light: 'bg-[#F1F5F9] text-[#64748B]',
    },
  };

  const colorStyle = colors[color] || colors.blue;
  const variantStyle = colorStyle[variant] || colorStyle.solid;
  const roundedStyle = rounded === 'full' ? 'rounded-full' : 'rounded-md';

  return (
    <span className={`inline-flex items-center px-4 py-1 text-xs font-semibold ${variantStyle} ${roundedStyle}`}>
      {children}
    </span>
  );
};

export default Badge;
