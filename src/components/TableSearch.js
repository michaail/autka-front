import React, { Component } from 'react';
// import ReactTable from 'react-table';

import 'react-table/react-table.css';

export default class TableSearch extends Component {
  constructor() {
    super();
    this.state = {
      lotId: '',
      make: '',
      model: '',
      isID: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // async componentDidMount() {

  // }

  handleChange = (event) => {
    const { value } = event.target;
    if (event.target.name === 'lotId') {
      if (value) {
        if (/^\d+$/.test(value)) {
          this.setState({
            make: '',
            model: '',
            lotId: value,
            isID: true,
          });
        }
      } else {
        this.setState({
          lotId: '',
          isID: false,
        });
      }
    } else if (event.target.name === 'make') {
      this.setState({ make: value });
    } else if (event.target.name === 'model') {
      this.setState({ model: value });
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { lotId, make, model } = this.state;

    console.log(`lotID: ${lotId}\nmake: ${make}\nmodel: ${model}`);

    // pass the state up

    // const queryPrefix = 'http://localhost:3001/api/lots';
    // let querySufix = '';
    // const params = [lotId, make, model];

    // if (lotId !== '') {
    //   querySufix = `${querySufix}/${lotId}`;
    // } else if (make !== '') {
    //   querySufix = `${querySufix}?make=${make}`;
    //   if (model !== '') {
    //     querySufix = `${querySufix}&model=${model}`;
    //   }
    // }

    // const data = await fetch(`${queryPrefix}${querySufix}`).then(response => response.json());
    // const { documents, meta } = data;
    // console.log(documents);
  }

  render() {
    const {
      isID, make, model, lotId,
    } = this.state;

    return (
      <div id="lot-container">
        <div>
          <form id="search" onSubmit={this.handleSubmit}>
            {/* <label>Enter LotID:</label> */}
            <input type="text" name="lotId" placeholder="lotID" pattern="[0-9]*" onChange={this.handleChange} value={lotId} />
            {/* <label>Enter make:</label> */}
            <input type="text" name="make" placeholder="producent" onChange={this.handleChange} disabled={isID} value={make} />
            {/* <label>Enter model:</label> */}
            <input type="text" name="model" placeholder="model" onChange={this.handleChange} disabled={isID} value={model} />
            <input type="submit" value="Find lots" />
          </form>
        </div>
      </div>
    );
  }
}
