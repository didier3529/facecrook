import PropTypes from 'prop-types';
import React from 'react';

/**
 * Error Boundary component for FaceCrook
 * Catches JavaScript errors anywhere in the component tree and displays a fallback UI
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details
        console.error('Error caught by boundary:', error, errorInfo);

        this.setState({
            error,
            errorInfo
        });

        // You can also log the error to an error reporting service here
        // For example: logErrorToService(error, errorInfo);
    }

    render() {
        const { hasError, error, errorInfo } = this.state;
        const { children } = this.props;

        if (hasError) {
            return (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold text-red-600 mb-2">🚨 Oops! Something went wrong</h1>
                            <p className="text-gray-600">
                                Don&apos;t worry - this error boundary caught the issue to prevent a blank page!
                            </p>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
                            <p className="text-red-700 text-sm font-mono">
                                {error && error.toString()}
                            </p>
                        </div>

                        {errorInfo && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                                <h3 className="font-semibold text-gray-800 mb-2">Component Stack:</h3>
                                <pre className="text-gray-700 text-xs overflow-auto max-h-32">
                                    {errorInfo.componentStack || 'No stack trace available'}
                                </pre>
                            </div>
                        )}

                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                🔄 Reload Page
                            </button>
                            <button
                                type="button"
                                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                🔁 Try Again
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500">
                                This error boundary prevents blank pages by catching JavaScript errors.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        // No error, render children normally
        return children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired
};

export default ErrorBoundary; 