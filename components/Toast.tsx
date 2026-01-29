import React from 'react';
import { useToast } from './ToastContext';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-[100] flex flex-col gap-3 pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        const Icon =
          toast.type === 'success'
            ? CheckCircle
            : toast.type === 'error'
              ? XCircle
              : Info;
        const bgClass =
          toast.type === 'success'
            ? 'bg-brand-800 text-brand-50 border-brand-700'
            : toast.type === 'error'
              ? 'bg-red-900/95 text-red-50 border-red-800'
              : 'bg-brand-800 text-brand-100 border-brand-700';
        return (
          <div
            key={toast.id}
            className={`${bgClass} border shadow-lg rounded-md px-4 py-3 flex items-center gap-3 pointer-events-auto animate-fadeIn`}
            role="alert"
          >
            <Icon size={20} className="flex-shrink-0" />
            <p className="flex-1 text-sm font-light">{toast.message}</p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-200"
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
