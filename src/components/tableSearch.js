import React, { Component } from 'react';
// import ReactTable from 'react-table';
import Table from './table';

import 'react-table/react-table.css';

export default class TableSearch extends Component {
  constructor() {
    super();
    this.state = {
      lotId: '',
      make: '',
      model: '',
      documents: [],
      meta: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const queryString = 'http://localhost:3001/api/lots';
    const data = await fetch(queryString).then(response => response.json());

    const { documents, meta } = data;

    this.setState({
      documents,
      meta,
    });
  }

  handleChange = (event) => {
    const { value } = event.target;
    if (event.target.name === 'lotId') {
      this.setState({ lotId: value });
    } else if (event.target.name === 'make') {
      this.setState({ make: value });
    } else if (event.target.name === 'model') {
      this.setState({ model: value });
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { lotId, make, model } = this.state;

    const queryPrefix = 'http://localhost:3001/api/lots';
    let querySufix = '';
    // const params = [lotId, make, model];

    if (lotId !== '') {
      querySufix = `${querySufix}/${lotId}`;
    } else if (make !== '') {
      querySufix = `${querySufix}?make=${make}`;
      if (model !== '') {
        querySufix = `${querySufix}&model=${model}`;
      }
    }

    const data = await fetch(`${queryPrefix}${querySufix}`).then(response => response.json());
    const { documents, meta } = data;
    console.log(documents);
    this.setState({
      documents,
      meta,
    });
  }

  render() {
    const { documents, meta } = this.state;

    return (
      <div id="lot-container">
        <div>
          <form id="search" onSubmit={this.handleSubmit}>
            {/* <label>Enter LotID:</label> */}
            <input type="text" name="lotId" placeholder="lotID" onChange={this.handleChange} />
            {/* <label>Enter make:</label> */}
            <input type="text" name="make" placeholder="producent" onChange={this.handleChange} />
            {/* <label>Enter model:</label> */}
            <input type="text" name="model" placeholder="model" onChange={this.handleChange} />
            <input type="submit" value="Find lots" />
          </form>
        </div>
        <Table documents={documents} meta={meta} />
      </div>
    );
  }
}
