import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

function Alert({ type = 'info', title, message, onClose }) {
  const bgColor = {
    success: 'bg-green-50',
    error: 'bg-red-50',
    warning: 'bg-yellow-50',
    info: 'bg-blue-50',
  }[type];

  const borderColor = {
    success: 'border-green-200',
    error: 'border-red-200',
    warning: 'border-yellow-200',
    info: 'border-blue-200',
  }[type];

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800',
  }[type];

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }[type];

  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg p-4 flex items-start space-x-3 mb-4`}>
      <Icon className={`${textColor} flex-shrink-0 mt-0.5`} size={20} />
      <div className="flex-1">
        {title && <h3 className={`${textColor} font-semibold`}>{title}</h3>}
        <p className={`${textColor} text-sm`}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`${textColor} hover:opacity-70 flex-shrink-0`}
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default Alert;
