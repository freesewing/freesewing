import React from 'react';
import ResetButtons from './reset-buttons'
import {EventGroup} from 'shared/components/workbench/events'
import DefaultErrorView from './view';

const ErrorView = (props) => {
  if (props.children) return props.children

  const inspectChildrenProps = {
    type: 'error',
    events: [props.error],
    units: props.gist?.units
  }
  const inspectChildren = (<EventGroup {...inspectChildrenProps}></EventGroup>)
  return (props.children  || (<DefaultErrorView inspectChildren={inspectChildren}>
        <h4>If you think your last action caused this error, you can: </h4>
        <ResetButtons undoGist={props.undoGist} resetGist={props.resetGist} />
      </DefaultErrorView>))
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    if (this.props.gist !== prevProps.gist) {
      this.setState({hasError: false})
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorView {...this.props} error={this.state.error}>{this.errorView}</ErrorView>
    }

    try {
      return this.props.children;
    } catch(e) {
      return <ErrorView {...this.props} error={e}>{this.errorView}</ErrorView>;
    }
  }
}

export default ErrorBoundary
