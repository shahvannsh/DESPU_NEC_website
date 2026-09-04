import { Component, type ErrorInfo, type ReactNode } from "react";
import { TriangleAlert, RotateCcw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("DESPU website error caught by boundary:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-black text-neutral-900 dark:text-white px-6 text-center">
          {/* Decorative Radial Gradients */}
          <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-200/20 dark:bg-blue-900/15 blur-[120px] mix-blend-screen pointer-events-none opacity-40" />
          <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] rounded-full bg-indigo-200/20 dark:bg-indigo-900/15 blur-[120px] mix-blend-screen pointer-events-none opacity-40" />

          <div className="relative z-10 flex max-w-md flex-col items-center">
            {/* TriangleAlert Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 p-4 mb-2">
              <TriangleAlert className="h-10 w-10 text-black/70 dark:text-white/70" />
            </div>

            {/* Headline */}
            <h1 className="mt-4 font-sans text-2xl font-semibold text-neutral-900 dark:text-white sm:text-3xl tracking-tight">
              Something went wrong
            </h1>

            {/* Supporting text */}
            <p className="mt-2 text-base text-black/60 dark:text-white/60 font-sans max-w-sm">
              An unexpected error occurred while loading this section. Retrying usually fixes it.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={this.handleReset}
                className="pl-6 pr-2 py-2 rounded-full bg-black text-white dark:bg-white dark:!text-black flex items-center gap-3 transition-all duration-300 hover:scale-105 group cursor-pointer shadow-lg"
              >
                <span className="font-sans font-bold text-base text-white dark:!text-black">
                  Try Again
                </span>
                <div className="w-[36px] h-[36px] rounded-full bg-[#3054ff] hover:bg-[#2040e0] flex items-center justify-center transition-colors shrink-0">
                  <RotateCcw className="w-4 h-4 text-white" />
                </div>
              </button>

              <a
                href="/"
                className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white backdrop-blur-sm hover:bg-black/5 dark:hover:bg-white/10 px-5 py-2.5 rounded-full flex items-center font-sans font-semibold transition-all border border-black/10 dark:border-white/10"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </a>
            </div>

            {/* Development-only error details */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-8 w-full text-left rounded-lg bg-black/5 dark:bg-white/5 p-4 text-xs font-mono text-neutral-700 dark:text-neutral-300 overflow-auto max-h-40">
                <summary className="cursor-pointer font-semibold mb-2">Error details (Dev Mode)</summary>
                <pre className="whitespace-pre-wrap">{this.state.error.toString()}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
