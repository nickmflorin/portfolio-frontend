import React from 'react';


class ErrorBoundary extends React.Component {

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error)
    console.error(errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h3>{"Something went wrong."}</h3>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
