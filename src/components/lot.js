import React, { Component } from 'react';

export default class Lot extends Component {
  constructor(props) {
    super(props);
    const { lotData } = this.props;
    this.state = {
      lotData,
    };
  }

  render() {
    // const { } = this.state;

    return (
      <div />
    );
  }
}
