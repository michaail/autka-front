import React, { Component } from 'react';

import { Input, Button, Form } from 'antd';

import TableNew from './TableNew';

export default class AuctionParent extends Component {
  render() {
    return (
      <div>
        <div className="TableSearch">
          <Form layout="inline">
            <Form.Item label="LotID">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" icon="search" />
            </Form.Item>
          </Form>
        </div>
        <TableNew />
      </div>
    );
  }
}
