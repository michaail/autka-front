import React, { Component } from 'react';
import ReactTable from 'react-table';
// import axios from 'axios';

export default class Table extends Component {
  constructor(props) {
    super(props);
    // const { make, model, lotID } = this.props;
    this.state = {
      documents: [],
      meta: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // componentWillReceiveProps(prop) {
  //   // resetowanie stanu do zera page
  //   console.log('recvProps');
  //   const { make, model, lotID } = this.props;
  //   if (prop.make !== make) {

  //   }

  //   fetch('http://localhost:3001/api/lots');
  // }

  handleChange(state, instance) {
    console.log('handleChange');
    fetch(`http://ec2-34-248-234-92.eu-west-1.compute.amazonaws.com:3001/api/lots?page=${state.page + 1}&per_page=${state.pageSize}`)
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
    const locationDict = {
      201: 'Toronto',
      202: 'London',
      205: 'Montreal',
      206: 'Montcon',
      207: 'Halifax',
    };

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
            Cell: e => <a href={`http://www.copart.ca/lot/${e.value}`} target="_blank" rel="noopener noreferrer">{e.value}</a>,
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
            Cell: e => <div>{ locationDict[e.value] }</div>,
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
