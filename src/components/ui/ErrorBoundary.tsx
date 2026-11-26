import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0E0E10] text-white flex items-center justify-center px-6">
          <div className="max-w-md w-full rounded-[22px] cnx-clay-dark-static p-7 text-center space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Something went out of sync</h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              A recent update may have refreshed this page. Reload to load the latest version.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="cnx-clay-btn-white px-5 py-2.5 rounded-xl text-xs font-semibold"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
