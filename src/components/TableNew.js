/* eslint-disable no-await-in-loop */
import React, { Component } from 'react';
import { Table } from 'antd';

import 'antd/dist/antd.css';
import '../styles/table.css';
import conf from '../conf';

export default class TableNew extends Component {
  locationDict = {
    201: 'Toronto',
    202: 'London',
    205: 'Montreal',
    206: 'Montcon',
    207: 'Halifax',
  };

  columns = [{
    title: 'LotID',
    key: 'lotID',
    dataIndex: 'lotID',
    render: text => <a href={`http://www.copart.ca/lot/${text}`} target="_blank" rel="noopener noreferrer">{text}</a>,
    width: '9%',
  }, {
    title: 'Marka',
    key: 'make',
    dataIndex: 'make',
    width: '9%',
    onFilter: (value, record) => record.make.indexOf(value) === 0,
    // sorter: (a, b) => console.log(a),
  }, {
    title: 'Model',
    key: 'model',
    dataIndex: 'model',
    width: '9%',
  }, {
    title: 'Rocznik',
    key: 'year',
    dataIndex: 'year',
    width: '9%',
  }, {
    title: 'Cena',
    key: 'price',
    dataIndex: 'price',
    width: '9%',
  }, {
    title: 'PL',
    key: 'plPrice',
    dataIndex: 'plPrice',
    width: '9%',
  }, {
    title: 'UA',
    key: 'uaPrice',
    dataIndex: 'uaPrice',
    width: '9%',
  }, {
    title: 'Kupiec',
    key: 'buyer',
    dataIndex: 'buyer',
    width: '7%',
  }, {
    title: 'Uszkodzenia',
    key: 'damage',
    dataIndex: 'details.Primary Damage',
    width: 'auto',
  }, {
    title: 'Lokalizacja',
    key: 'location',
    dataIndex: 'location',
    width: '9%',
    render: text => <div>{this.locationDict[text]}</div>,
  }, {
    title: 'Data',
    key: 'createdAt',
    dataIndex: 'createdAt',
    width: '9%',
    render: (text) => {
      if (text == null) {
        return <div />;
      }
      const date = new Date(text);
      const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      return <div>{dateString}</div>;
    },

  }];

  constructor(props) {
    super(props);
    this.state = {
      docs: [],
      meta: {},
      makes: [],
      make: null,
      models: [],
      loading: false,
    };
    this.initial = {
      page: 0,
      pageSize: 20,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    // this.onChange = this.onChange.bind(this);
    this.getPage = this.getPage.bind(this);
  }

  async componentDidMount() {
    const { pageSize } = this.initial;
    await this.getPage(1, pageSize);
    const { meta } = this.state;
    const { pagesCount } = meta;
    for (let i = 2; i <= pagesCount; i += 1) {
      await this.getPage(i, pageSize);
    }
    console.log(this.state.docs[0].priceInt);
  }


  getMakes() {
    fetch(`${conf.config.API_URL}/api/makes`)
      .then(recvData => recvData.json())
      .then((json) => {
        const { documents } = json;
        this.setState({
          makes: documents,
        });
      });
  }

  async getPage(page, pageSize) {
    await fetch(`${conf.config.API_URL}/api/lots?page=${page}&per_page=${pageSize}`)
      .then(recvData => recvData.json())
      .then((json) => {
        const { documents, meta } = json;
        const { docs } = this.state;
        docs.push(...documents);
        this.setState({
          docs,
          meta,
        });
      });
  }


  render() {
    const { docs, meta } = this.state;

    const {
      totalCount, page, docLength, pagesCount,
    } = meta;

    let pageSize = docLength;
    if (page === pagesCount) {
      pageSize = 20;
    }

    const pagination = {
      pageSize,
      total: totalCount,
      showQuickJumper: true,
      showSizeChanger: true,
      // onChange: this.onChange,
      // onShowSizeChange: this.onChange,
    };

    return (
      <Table dataSource={docs} columns={this.columns} pagination={pagination} size="small" />
    );
  }
}
