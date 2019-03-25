import React, { Component } from 'react';

import { Form, Button } from 'antd';

import AutoCompleteSearch from './AutoCompleteSearch'
// import ReactTable from 'react-table';

import 'react-table/react-table.css';

export default class TableSearch extends Component {
  constructor() {
    super();
    this.state = {

    };

  }

  


  render() {
    return (
      <div>
        <Form layout="inline">
          <Form.Item label="Marka">
            <AutoCompleteSearch />
          </Form.Item>
          <Form.Item label="Model">
            <AutoCompleteSearch />
          </Form.Item>
          <Form.Item label="LotID">
            <AutoCompleteSearch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon="search">Szukaj</Button>
          </Form.Item>
        </Form>
        
      </div>
    )
  }
}
