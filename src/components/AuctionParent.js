import React, { Component } from 'react';

import { Input, Button, Form } from 'antd';

import TableNew from './TableNew';

export default class AuctionParent extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      value,
    });
  }

  handleSubmit() {
    const { value } = this.state;
    console.log(value);
  }

  render() {
    return (
      <div>
        <div className="TableSearch">
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item label="LotID">
              <Input onChange={this.handleChange} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" icon="search" onClick={this.handleSubmit} />
            </Form.Item>
            <Form.Item>
              <Button type="danger" icon="delete" />
            </Form.Item>
          </Form>
        </div>
        <TableNew />
      </div>
    );
  }
}
