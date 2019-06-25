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
      filters: {},
      loading: false,
    };

    this.getPage = this.getPage.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentDidMount() {
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

    const recvData = await fetch(`${conf.config.API_URL}/api/lots?page=${page}&pageSize=${pageSize}${queryString}`);
    const data = await recvData.json();
    const { pagination } = this.state;
    const { documents, meta } = data;

    pagination.total = meta.totalCount;
    this.setState({
      docs: documents,
      pagination,
      loading: false,
    });
  }

  searchPage = async (pageData, search, filters, sorters) => {
    const recvData = await fetch(`${conf.config.API_URL}/api/lots/search`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pagination: pageData,
        search,
        filters,
        sorters,
      }),
    });
    const data = await recvData.json();
    const { documents, meta } = data;

    this.setState(prev => ({
      docs: documents,
      pagination: {
        ...prev.pagination,
        total: meta.totalCount,
      },
      loading: false,
    }));
  }

  handleSearch = (value) => {
    this.setState({
      search: value,
      loading: true,
    });
    const { pagination, filters } = this.state;
    this.searchPage(pagination, value, filters);
  }

  handleSearchReset = () => {
    this.setState({
      search: {},
    });
  }

  handleTableChange(pageInfo, filters, sorter) {
    const { search } = this.state;
    const pagination = {
      page: pageInfo.current,
      pageSize: pageInfo.pageSize,
    };
    this.setState({
      pagination,
      filters,
    });
    const { pageSize, page } = pagination;
    if (Object.entries(search).length === 0 && search.constructor === Object) {
      this.getPage(page, pageSize, filters);
    } else {
      this.searchPage(pagination, search, filters, sorter);
    }
  }

  render() {
    const {
      makes, docs, pagination, loading,
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
          onTableChange={this.handleTableChange}
          loading={loading}
        />
      </div>

    );
  }
}
