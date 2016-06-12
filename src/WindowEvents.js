import React, { PropTypes, Component } from 'react';
import includes from 'lodash.includes';

import { rafThrottle } from './utils/timing.utils';


const listeners = {
  resize: [],
  scroll: [],
}


class WindowEvents extends Component {
  constructor(props) {
    super(props);
    this.handler = rafThrottle(this.props.handler);
  }

  componentDidMount() {
    if (includes(this.props.lifecycleMethods, 'componentDidMount')) {
      this.handler();
    }

    console.log("Adding event listener on", this.props.event, this.handler)

    window.addEventListener(this.props.event, this.handler);
  }

  componentDidUpdate() {
    if (includes(this.props.lifecycleMethods, 'componentDidUpdate')) {
      this.handler();
    }
  }

  componentWillUnmount() {
    window.removeEventListener(this.props.event, this.handler);
  }

  render() {
    // Use ES6 rest operator to extract props to delegate to the element
    // created (we don't want to pass props like `event` or `handler`).
    const {
      // eslint-disable-next-line no-unused-vars
      children, event, handler, lifecycleMethods, typeName, ...props,
    } = this.props;

    // Using createElement instead of JSX because we don't know the node type.
    return React.createElement(typeName, props, children);
  }
}

WindowEvents.propTypes = {
  children: PropTypes.node,
  event: PropTypes.oneOf(['resize', 'scroll']),
  handler: PropTypes.func,
  typeName: PropTypes.string,
  lifecycleMethods(props, propName, componentName) {
    let methodsProvided = propName[props];

    if (typeof methodsProvided === 'undefined') {
      return;
    } else if (typeof methodsProvided === 'string') {
      let methodsProvided = [methodsProvided];
    }

    if (methodsProvided && !Array.isArray(methodsProvided)) {
      return new Error(`Please supply an array to lifecycleMethods, in ${componentName}`);
    }

    const validLifecycleMethods = [
      'componentDidMount',
      'componentDidUpdate',
    ];

    // Ensure that all methods supplied are valid.
    if (methodsProvided.find(method => (method !== validLifecycleMethods))) {
      return new Error(`
        Invalid lifecycle method provided to ${componentName}.
        Acceptable options are ${validLifecycleMethods.join(', ')}.
        You provided ${methodsProvided.join(', ')}.
      `);
    }
  }
};

WindowEvents.defaultProps = {
  typeName: 'div',
};

export default WindowEvents;
