import React, { PropTypes, Component } from 'react';

import WindowEvents from '../../src/WindoWEvents';


class WindowEventsWrapper extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      ticks: 0
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', (ev) => { console.log(ev)})
  }



  handleScroll(ev) {
    console.log(ev);
  }

  render() {
    return (
      <WindowEvents
        event="scroll"
        handler={this.handleScroll}
        lifecycleMethods={['componentDidMount']}
      >
        <div style={{
          position: 'relative',
          height: '2000px'
        }}>
          <div style={{ position: 'fixed', top: '1rem', left: '1rem' }}>
            Ticks: {this.state.ticks}
          </div>
        </div>
      </WindowEvents>
    )
  }
}

export default WindowEventsWrapper;
