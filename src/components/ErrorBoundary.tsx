import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keep this even in production — without it, a runtime error is
    // invisible until someone reports "the site is blank".
    console.error("DESPU website crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-base-950 px-6 text-center">
          <span className="font-display text-2xl font-semibold text-white">
            Something went wrong.
          </span>
          <p className="mt-3 max-w-sm text-sm text-white/55">
            This page hit an unexpected error. Refreshing usually fixes it.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-7 rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-6 py-2.5 text-sm font-semibold text-base-950 transition-transform hover:scale-105"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
