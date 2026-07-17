import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-6">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-black text-slate-900 mb-3">頁面載入失敗</h1>
            <p className="text-slate-500 text-sm mb-6">{this.state.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-800 transition-colors"
            >
              重新載入
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
