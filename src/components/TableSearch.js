import React, { Component } from 'react';

import { Form, Button } from 'antd';

import AutoCompleteSearch from './AutoCompleteSearch';
import conf from '../conf';
// import ReactTable from 'react-table';

import 'react-table/react-table.css';

export default class TableSearch extends Component {
  constructor() {
    super();
    this.state = {
      filters: {},
      makes: {},
      make: '',
      lotID: '',
    };
  }

  async componentDidMount() {
    await this.getMakes();
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

  handleSearch() {

  }

  handleReset() {

  }

  render() {
    const { makes, make } = this.state;

    return (
      <div className="TableSearch">
        <Form layout="inline">
          <Form.Item label="Marka">
            <AutoCompleteSearch placeholder="Ford" dataSet={makes.keys} />
          </Form.Item>
          <Form.Item label="Model">
            <AutoCompleteSearch placeholder="Escape" dataSet={makes[make]} />
          </Form.Item>
          <Form.Item label="LotID">
            <AutoCompleteSearch placeholder="LotID" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon="search" onClick={this.handleSearch}>Szukaj</Button>
          </Form.Item>
          <Form.Item>
            <Button type="danger" icon="delete" onClick={this.handleReset}>Wyczyść</Button>
          </Form.Item>
        </Form>

      </div>
    );
  }
}
