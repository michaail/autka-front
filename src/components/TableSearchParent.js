import React, { Component } from 'react';

import TableSearch from './TableSearch';
import TableNew from './TableNew';
import conf from '../conf';

function queryStringFor(field, query) {
  let qs = '';
  if (query[field]) {
    query[field].forEach((x) => {
      qs += `&${field}=${x}`;
    });
  }
  return qs;
}

export default class TableSearchParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makes: {},
      search: {},
      docs: [],
      pagination: {},
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchReset = this.handleSearchReset.bind(this);
    this.getPage = this.getPage.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentDidMount() {
    console.log('didMount');
    this.getMakes();
    this.getPage(1, 20);
  }

  async getMakes() {
    const recvData = await fetch(`${conf.config.API_URL}/api/makes`);
    const json = await recvData.json();
    this.setState({
      makes: json,
    });
  }

  async getPage(page, pageSize, query) {
    let queryString = '';
    if (query) {
      const queryParams = ['make', 'model', 'buyer', 'location'];
      queryParams.forEach((param) => {
        queryString += queryStringFor(param, query);
      });
    }

    const recvData = await fetch(`${conf.config.API_URL}/api/lots?page=${page}&per_page=${pageSize}${queryString}`);
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

  async searchPage(pageData, search, filters) {
    const recvData = await fetch(`${conf.config.API_URL}/api/lots/search`, {
      method: 'POST',
      body: {
        pageData,
        search,
        filters,
      },
    });
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

  handleSearch(value) {
    this.setState({
      search: value,
    });
  }

  handleSearchReset() {
    this.setState({
      search: {},
    });
  }

  handleTableChange(pagination, filters, sorter) {
    const { search } = this.state;
    const { pageSize, current, total } = pagination;
    if (Object.entries(search).length === 0 && search.constructor === Object) {
      this.getPage(current, pageSize, filters);
    } else {

    }
  }

  render() {
    const {
      makes, search: filters, docs, pagination,
    } = this.state;

    return (
      <div>
        <TableSearch
          makes={makes}
          onSearch={this.handleSearch}
        />
        <TableNew
          docs={docs}
          pagination={pagination}
          filters={filters}
          onTableChange={this.handleTableChange}
        />
      </div>

    );
  }
}
