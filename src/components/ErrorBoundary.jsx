import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console for debugging
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      const rtl = this.props.language === 'he';

      return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="glass-card rounded-2xl p-8 text-center border border-neutral-200">
              <div className="w-16 h-16 bg-primary-500/15 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-primary-600" />
              </div>

              <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                {rtl ? 'שגיאה בטעינת העמוד' : 'Page Loading Error'}
              </h1>

              <p className="text-neutral-700 mb-8 leading-relaxed">
                {rtl
                  ? 'אירעה שגיאה בלתי צפויה. אנא נסה לרענן את העמוד או חזור לדף הבית.'
                  : 'An unexpected error occurred. Please try refreshing the page or return to the home page.'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  {rtl ? 'נסה שוב' : 'Try Again'}
                </button>

                <Link
                  to={createPageUrl('Home') + `?lang=${this.props.language}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-neutral-200 hover:border-primary-300 text-primary-700 rounded-lg font-medium transition-colors"
                >
                  {rtl ? 'חזור לדף הבית' : 'Go Home'}
                </Link>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-8 text-left">
                  <summary className="text-neutral-500 cursor-pointer hover:text-neutral-700">
                    {rtl ? 'פרטי שגיאה (למפתחים)' : 'Error Details (Development)'}
                  </summary>
                  <pre className="mt-4 p-4 bg-neutral-900 text-neutral-100 rounded-lg text-xs overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
