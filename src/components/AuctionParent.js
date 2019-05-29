import React, { Component } from 'react';
import { Input, Button, Form } from 'antd';

import TableNew from './TableNew';

import conf from '../conf';

export default class AuctionParent extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      docs: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getLot = this.getLot.bind(this);
  }

  async getLot(lotID) {
    const recvData = await fetch(`${conf.config.API_URL}/api/lots/${lotID}`);
    const data = await recvData.json();

    this.setState({
      docs: data,
    });
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      value,
    });
  }

  handleSubmit() {
    const { value } = this.state;
    this.getLot(value);
  }


  render() {
    const { docs } = this.state;

    return (
      <div>
        <div className="TableSearch">
          <Form layout="inline">
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
        <TableNew docs={docs} />
      </div>
    );
  }
}
