import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

const Alert = ({ type = 'info', title, message, onDismiss }) => {
  const types = {
    success: {
      bg: 'bg-success-50',
      border: 'border-success-300',
      text: 'text-success-700',
      icon: <CheckCircle className="text-success-600" size={20} />,
    },
    error: {
      bg: 'bg-danger/10',
      border: 'border-danger/35',
      text: 'text-error-700',
      icon: <XCircle className="text-danger" size={20} />,
    },
    warning: {
      bg: 'bg-warning/10',
      border: 'border-warning/35',
      text: 'text-warning-700',
      icon: <AlertCircle className="text-warning" size={20} />,
    },
    info: {
      bg: 'bg-primary/10',
      border: 'border-primary/35',
      text: 'text-navy',
      icon: <Info className="text-primary" size={20} />,
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
        <button onClick={onDismiss} className="text-text-secondary hover:text-navy">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
