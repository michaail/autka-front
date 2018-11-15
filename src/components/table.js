import React, { Component } from 'react';
import ReactTable from 'react-table';
// import axios from 'axios';

export default class Table extends Component {
  constructor(props) {
    super(props);
    const { documents } = this.props;
    this.state = {
      documents,
      meta: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { documents, meta } = newProps;
    this.setState({
      documents,
      meta,
    });
  }

  handleChange(state, instance) {
    fetch(`http://localhost:3001/api/lots?page=${state.page + 1}&per_page=${state.pageSize}`)
      .then(recvData => recvData.json())
      .then((json) => {
        const { documents, meta } = json;
        this.setState({
          documents,
          meta,
        });
      });
  }

  render() {
    const { documents, meta } = this.state;

    console.log('render');
    const tab = (
      <ReactTable

        data={documents}
        pages={meta.pages_count}

        manual
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

        onFetchData={this.handleChange}
        className="-striped -highlight"

      />
    );
    return (
      <div className="container1">{ tab }</div>

    );
  }
}
