import React, { Component } from 'react';

import TableSearch from './TableSearch';
import TableNew from './TableNew';
import conf from '../conf';


export default class TableSearchParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makes: {},
    };
  }

  getMakes() {
    fetch(`${conf.config.API_URL}/api/makes`)
      .then(recvData => recvData.json())
      .then((json) => {
        this.setState({
          makes: json,
        });
      });
  }

  render() {
    return (
      <div>
        <TableSearch />
        <TableNew />
      </div>

    );
  }
}
