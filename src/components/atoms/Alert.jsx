import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

const Alert = ({ type = 'info', title, message, onDismiss }) => {
  const types = {
    success: {
      bg: 'bg-[#E1F9F2]',
      border: 'border-[#34D399]',
      text: 'text-[#004434]',
      icon: <CheckCircle className="text-[#34D399]" size={20} />,
    },
    error: {
      bg: 'bg-[#FEE2E2]',
      border: 'border-[#F87171]',
      text: 'text-[#991B1B]',
      icon: <XCircle className="text-[#F87171]" size={20} />,
    },
    warning: {
      bg: 'bg-[#FEF9C3]',
      border: 'border-[#FACC15]',
      text: 'text-[#854D0E]',
      icon: <AlertCircle className="text-[#FACC15]" size={20} />,
    },
    info: {
      bg: 'bg-[#E0F2FE]',
      border: 'border-[#38BDF8]',
      text: 'text-[#075985]',
      icon: <Info className="text-[#38BDF8]" size={20} />,
    },
  };

  const style = types[type] || types.info;

  return (
    <div className={`flex w-full items-start gap-4 rounded-lg border-l-[6px] ${style.bg} ${style.border} p-4 shadow-sm`}>
      <div className="mt-0.5 flex-shrink-0">{style.icon}</div>
      <div className="flex-grow">
        <h5 className={`font-bold ${style.text}`}>{title}</h5>
        <p className={`mt-1 text-sm leading-relaxed ${style.text} opacity-90`}>{message}</p>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="text-slate-400 hover:text-slate-600">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
