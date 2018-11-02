import React, { Component } from 'react';
import ReactTable from 'react-table';

export default class Table extends Component {
  constructor(props) {
    super(props);
    const { content } = this.props;
    this.state = {
      data: content,
    };
  }

  componentWillReceiveProps(newProps) {
    const { content } = newProps;
    this.setState({
      data: content,
    });
  }

  render() {
    const { data } = this.state;
    const tab = (
      <ReactTable
        data={data}
        columns={[
          {
            Header: 'LotID',
            accessor: 'lotID',

          },
          {
            Header: 'Producent',
            accessor: 'make',
          },
          {
            Header: 'Model',
            accessor: 'model',
          },
          {
            Header: 'Rok',
            accessor: 'year',
          },
          {
            Header: 'Cena',
            accessor: 'price',
          },
          {
            Header: 'PL',
            accessor: 'plPrice',
          },
          {
            Header: 'UA',
            accessor: 'uaPrice',
          },
          {
            Header: 'Primary',
            accessor: 'details.Primary Damage',
          },
          {
            Header: 'Secondary',
            accessor: 'details.Secondary Damage',
          },
          {
            Header: 'Lokacja',
            accessor: 'location',
          },
        ]}
        className="-striped -highlight"
      />
    );
    return (
      <div className="container1">{ tab }</div>

    );
  }
}
