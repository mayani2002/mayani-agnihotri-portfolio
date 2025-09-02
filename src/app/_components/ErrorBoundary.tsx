/**
 * Error Boundary Components
 * 
 * Error boundaries are React components that catch JavaScript errors anywhere in their child 
 * component tree, log those errors, and display a fallback UI instead of the component tree 
 * that crashed. They work like JavaScript catch blocks but for React components.
 * 
 * Key Features:
 * - Catches errors during rendering, in lifecycle methods, and in constructors
 * - Provides graceful fallback UI instead of white screen of death
 * - Logs errors for debugging in development
 * - Can be configured with custom error handlers for production logging
 */

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode; // The child components to wrap with error boundary
    fallback?: ReactNode; // Custom UI to show when an error occurs
    onError?: (error: Error, errorInfo: ErrorInfo) => void; // Optional callback for error handling/logging
}

interface State {
    hasError: boolean; // Whether an error has been caught
    error?: Error; // The actual error that was caught
    errorInfo?: ErrorInfo; // Additional error information from React
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        // Initialize with no error state
        this.state = { hasError: false };
    }

    // This lifecycle method is called when an error is thrown in a child component
    // It updates the state to indicate an error has occurred
    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    // This lifecycle method is called after an error has been thrown
    // It's used for logging the error and triggering side effects
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ error, errorInfo });

        // Call custom error handler if provided (useful for analytics/logging)
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }

        // Log to console in development for debugging
        if (process.env.NODE_ENV === 'development') {
            console.error('Error caught by boundary:', error);
            console.error('Error info:', errorInfo);
        }

        // In production, you might want to log to an error reporting service
        // Example: logErrorToService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default error UI
            return <DefaultErrorFallback error={this.state.error} />;
        }

        return this.props.children;
    }
}

// Default Error Fallback Component
const DefaultErrorFallback: React.FC<{ error?: Error }> = ({ error }) => (
    <div className="min-h-screen flex items-center justify-center surface p-6">
        <div className="max-w-md w-full text-center space-y-6">
            <div className="text-6xl">⚠️</div>
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-primary">Something went wrong</h1>
                <p className="text-secondary">
                    We apologize for the inconvenience. Please try refreshing the page.
                </p>
            </div>

            {process.env.NODE_ENV === 'development' && error && (
                <details className="text-left bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border">
                    <summary className="cursor-pointer font-medium text-red-700 dark:text-red-400">
                        Error Details (Development Mode)
                    </summary>
                    <pre className="mt-2 text-xs text-red-600 dark:text-red-300 overflow-auto">
                        {error.message}
                    </pre>
                    {error.stack && (
                        <pre className="mt-2 text-xs text-red-500 dark:text-red-400 overflow-auto">
                            {error.stack}
                        </pre>
                    )}
                </details>
            )}

            <div className="space-y-3">
                <button
                    onClick={() => window.location.reload()}
                    className="btn-primary w-full py-3 px-6 rounded-lg font-medium transition-colors"
                >
                    Refresh Page
                </button>
                <button
                    onClick={() => window.history.back()}
                    className="w-full py-3 px-6 rounded-lg font-medium border-themed hover-surface transition-colors"
                >
                    Go Back
                </button>
            </div>
        </div>
    </div>
);

// Component-level Error Boundary
// Use this for wrapping individual components that might fail independently
// This provides a smaller, more targeted fallback UI that doesn't break the entire page
export const ComponentErrorBoundary: React.FC<{
    children: ReactNode;
    componentName?: string; // Name of the component for better error messages
}> = ({ children, componentName = 'Component' }) => (
    <ErrorBoundary
        fallback={
            <div className="p-6 surface-elevated rounded-lg border-themed text-center space-y-4">
                <div className="text-4xl">😵</div>
                <div>
                    <h3 className="text-lg font-semibold text-primary">
                        {componentName} Error
                    </h3>
                    <p className="text-secondary text-sm mt-1">
                        This component encountered an error and couldn't load.
                    </p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="btn-secondary px-4 py-2 rounded-lg text-sm"
                >
                    Reload
                </button>
            </div>
        }
    >
        {children}
    </ErrorBoundary>
);

// Async Component Error Boundary
export const AsyncErrorBoundary: React.FC<{
    children: ReactNode;
    loading?: ReactNode;
    error?: ReactNode;
}> = ({ children, loading, error }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [hasError, setHasError] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading && loading) {
        return <>{loading}</>;
    }

    if (hasError && error) {
        return <>{error}</>;
    }

    return (
        <ErrorBoundary
            onError={() => setHasError(true)}
            fallback={error || <DefaultErrorFallback />}
        >
            {children}
        </ErrorBoundary>
    );
};

// Network Error Handler
export const NetworkErrorBoundary: React.FC<{
    children: ReactNode;
}> = ({ children }) => (
    <ErrorBoundary
        fallback={
            <div className="p-8 text-center surface-elevated rounded-lg border-themed space-y-4">
                <div className="text-5xl">📡</div>
                <div>
                    <h3 className="text-xl font-bold text-primary">Connection Error</h3>
                    <p className="text-secondary mt-2">
                        Unable to connect to the server. Please check your internet connection.
                    </p>
                </div>
                <div className="space-x-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="btn-primary px-6 py-3 rounded-lg"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 rounded-lg border-themed hover-surface"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        }
    >
        {children}
    </ErrorBoundary>
);

// Hook for error handling
export const useErrorHandler = () => {
    const [error, setError] = React.useState<Error | null>(null);

    const handleError = React.useCallback((error: Error) => {
        setError(error);
        console.error('Error handled by hook:', error);
    }, []);

    const clearError = React.useCallback(() => {
        setError(null);
    }, []);

    const throwError = React.useCallback((error: Error) => {
        throw error;
    }, []);

    return { error, handleError, clearError, throwError };
};
