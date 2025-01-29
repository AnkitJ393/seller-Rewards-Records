import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error("An error occurred:", error); 
  return { hasError: true }; 
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-boundary">Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default ErrorBoundary;
