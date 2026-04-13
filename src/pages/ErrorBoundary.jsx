import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Monitoring UI error:', error);
  }

  render() {
    if (this.state.hasError) {
      return <div className="empty-state">Terjadi error di halaman monitoring.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
