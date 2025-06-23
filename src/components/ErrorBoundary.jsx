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
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        this.setState({
            error,
            errorInfo
        });

        // You can also log the error to an error reporting service here
        // For example: logErrorToService(error, errorInfo);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    render() {
        if (this.state.hasError) {
            // Render custom fallback UI
            return (
                <div className="error-boundary">
                    <div className="error-container">
                        <div className="error-icon">🤯</div>
                        <h2 className="error-title">Oops! The Crypto Markets Crashed... Again!</h2>
                        <p className="error-message">
                            Don&apos;t worry, it&apos;s just a technical glitch in the FaceCrook matrix.
                            <br />
                            Even our satirical platform has more stability than most crypto projects!
                        </p>

                        <div className="error-actions">
                            <button
                                onClick={this.handleReset}
                                className="error-retry-button"
                                type="button"
                            >
                                🔄 Try Again (HODL Strong!)
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="error-reload-button"
                                type="button"
                            >
                                🏠 Go Home
                            </button>
                        </div>

                        {process.env.NODE_ENV === 'development' && (
                            <details className="error-details">
                                <summary>🔍 Developer Details (Click to expand)</summary>
                                <div className="error-stack">
                                    <h4>Error:</h4>
                                    <pre>{this.state.error && this.state.error.toString()}</pre>

                                    <h4>Component Stack:</h4>
                                    <pre>{this.state.errorInfo.componentStack}</pre>
                                </div>
                            </details>
                        )}
                    </div>

                    <style jsx>{`
            .error-boundary {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              padding: 20px;
            }
            
            .error-container {
              background: white;
              border-radius: 16px;
              padding: 40px;
              text-align: center;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
              max-width: 500px;
              width: 100%;
            }
            
            .error-icon {
              font-size: 4rem;
              margin-bottom: 20px;
            }
            
            .error-title {
              color: #2d3748;
              font-size: 1.5rem;
              font-weight: 600;
              margin-bottom: 16px;
              line-height: 1.4;
            }
            
            .error-message {
              color: #718096;
              font-size: 1rem;
              line-height: 1.6;
              margin-bottom: 32px;
            }
            
            .error-actions {
              display: flex;
              gap: 12px;
              justify-content: center;
              flex-wrap: wrap;
            }
            
            .error-retry-button,
            .error-reload-button {
              padding: 12px 24px;
              border-radius: 8px;
              border: none;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s;
              font-size: 0.9rem;
            }
            
            .error-retry-button {
              background: #4299e1;
              color: white;
            }
            
            .error-retry-button:hover {
              background: #3182ce;
              transform: translateY(-1px);
            }
            
            .error-reload-button {
              background: #edf2f7;
              color: #4a5568;
            }
            
            .error-reload-button:hover {
              background: #e2e8f0;
              transform: translateY(-1px);
            }
            
            .error-details {
              margin-top: 24px;
              text-align: left;
              background: #f7fafc;
              border-radius: 8px;
              padding: 16px;
            }
            
            .error-details summary {
              cursor: pointer;
              font-weight: 500;
              color: #4a5568;
              margin-bottom: 12px;
            }
            
            .error-stack pre {
              background: #1a202c;
              color: #e2e8f0;
              padding: 12px;
              border-radius: 4px;
              overflow-x: auto;
              font-size: 0.8rem;
              margin: 8px 0;
            }
            
            .error-stack h4 {
              color: #2d3748;
              font-size: 0.9rem;
              margin: 16px 0 8px 0;
            }
          `}</style>
                </div>
            );
        }

        // No error, render children normally
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired
};

export default ErrorBoundary; 