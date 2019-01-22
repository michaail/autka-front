/* eslint-disable no-await-in-loop */
import React, { Component } from 'react';
import { Table, Progress } from 'antd';

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
    dataIndex: 'make',
    width: '9%',
    key: 'make',
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
    filters: [
      { text: 'Ontario', value: 'ON' },
      { text: 'Quebec', value: 'QC' },
      { text: 'Polska', value: 'PL' },
      { text: 'Ukraina', value: 'UA' },
    ],
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
      columns: this.columns,
      docs: [],
      meta: {},
      makes: {},
      pagination: {
        pageSize: 20,
        showQuickJumper: true,
        showSizeChanger: true,
      },
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    // this.onChange = this.onChange.bind(this);
    this.getPage = this.getPage.bind(this);
    this.getMakes = this.getMakes.bind(this);
  }

  async componentDidMount() {
    this.getMakes();
    const pageSize = 20;
    await this.getPage(1, pageSize);

    this.setState((state) => {
      const {
        columns, makes, pagination, meta,
      } = state;

      const keys = Object.keys(makes).sort();
      const filterList = [];
      keys.forEach((key) => {
        filterList.push({ text: key, value: key });
      });
      columns[1].filters = filterList;

      pagination.pageSize = meta.docLength;
      pagination.total = meta.totalCount;
      return {
        columns,
      };
    });
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


  async getPage(page, pageSize, query) {
    let filterString = '';
    if (query) {
      if (query.make) {
        query.make.forEach((m) => {
          filterString += `&make=${m}`;
        });
      }
      if (query.model) {
        query.model.forEach((m) => {
          filterString += `&model=${m}`;
        });
      }
      if (query.buyer) {
        query.buyer.forEach((b) => {
          filterString += `&buyer=${b}`;
        });
      }
    }
    console.log(filterString);

    const recvData = await fetch(`${conf.config.API_URL}/api/lots?page=${page}&per_page=${pageSize}${filterString}`);
    const data = await recvData.json();

    const { pagination } = this.state;
    const { documents, meta } = data;

    pagination.total = meta.totalCount;

    this.setState({
      docs: documents,
      meta,
      pagination,
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    console.log(filters);
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });

    if (filters) {
      if (filters.make) {
        this.setState((state) => {
          const { columns, makes } = state;

          if (filters.make.length === 1) {
            const modelList = makes[filters.make[0]].sort();
            const filterList = [];
            modelList.forEach((key) => {
              filterList.push({ text: key, value: key });
            });
            columns[2].filters = filterList;
          } else {
            columns[2].filters = {};
          }
          return {
            columns,
          };
        });
      }
    }

    if (filters.make) {
      if (filters.make.length === 0) {
        // eslint-disable-next-line no-param-reassign
        filters.model = [];
      }
    }

    console.log(pagination.current);
    this.getPage(pagination.current, 20, filters);
  }


  render() {
    const { docs, columns } = this.state;


    const { pagination } = this.state;

    return (
      <div>
        <Table dataSource={docs} columns={columns} pagination={pagination} onChange={this.handleTableChange} size="small" />
      </div>
    );
  }
}
