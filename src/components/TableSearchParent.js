import React, { Component } from 'react';

import TableSearch from './TableSearch';
import TableNew from './TableNew';
// import ReactTable from 'react-table';

import 'react-table/react-table.css';

export default class TableSearchParent extends Component {
  render() {
    return (
      <div>
        <TableSearch />
        <TableNew />
      </div>

    );
  }
}
