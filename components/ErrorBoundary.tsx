import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-6 py-20 bg-brand-50">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-200 flex items-center justify-center text-brand-700">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-2xl font-serif text-brand-950 mb-3">Something went wrong</h1>
            <p className="text-brand-700 font-light mb-8">
              We encountered an unexpected error. Please try again.
            </p>
            <button
              type="button"
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-950 text-brand-50 font-medium tracking-wide hover:bg-brand-800 transition-colors rounded-sm"
            >
              <RefreshCw size={18} />
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
