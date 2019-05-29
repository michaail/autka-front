/* eslint-disable no-await-in-loop */
import React, { Component } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import '../styles/table.css';

export default class TableNew extends Component {
  locationDict = {
    201: 'Toronto',
    202: 'London',
    205: 'Montreal',
    206: 'Montcon',
    207: 'Halifax',
    295: 'Atlantic',
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
    filters: [
      { text: 'Przód', value: 'FRONT END' },
      { text: 'Tył', value: 'REAR END' },
      { text: 'Bok', value: 'SIDE' },
      { text: 'All over', value: 'ALL OVER' },
      { text: 'Spalony', value: 'BURN' },
      { text: 'Podwozie', value: 'UNDERCARRIAGE' },
      { text: 'Zalany', value: 'WATER/FLOOD' },
      { text: 'Zużycie', value: 'NORMAL WEAR' },
      { text: 'Mechaniczne', value: 'MECHANICAL' },
      { text: 'Przytarcia', value: 'MINOR DENT/SCRATCHES' },

    ],
  }, {
    title: 'Lokalizacja',
    key: 'location',
    dataIndex: 'location',
    width: '9%',
    render: text => <div>{this.locationDict[text]}</div>,
    filters: [
      { text: 'Toronto', value: 201 },
      { text: 'London', value: 202 },
      { text: 'Montreal', value: 205 },
      { text: 'Montcon', value: 206 },
      { text: 'Halifax', value: 207 },
      { text: 'Atlantic', value: 295 },
    ]
    ,
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
      pagination: {
        pageSize: 20,
        showQuickJumper: true,
        // showSizeChanger: true,
      },
      loading: false,
    };
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }


  componentWillReceiveProps(nextProp) {
    const { docs, pagination: pageInfo, loading } = nextProp;
    this.setState({
      docs,
      pagination: pageInfo,
      loading,
    });
  }

  handleTableChange(pagination, filters, sorter) {
    // if (filters) {
    //   if (filters.make) {
    //     this.setState((state) => {
    //       const { columns, makes } = state;

    //       if (filters.make.length === 1) {
    //         const modelList = makes[filters.make[0]].sort();
    //         const filterList = [];
    //         modelList.forEach((key) => {
    //           filterList.push({ text: key, value: key });
    //         });
    //         columns[2].filters = filterList;
    //       } else {
    //         columns[2].filters = {};
    //       }
    //       return {
    //         columns,
    //       };
    //     });
    //   }
    // }

    // if (filters.make) {
    //   if (filters.make.length === 0) {
    //     // eslint-disable-next-line no-param-reassign
    //     filters.model = [];
    //   }
    // }
    const { onTableChange } = this.props;
    onTableChange(pagination, filters, sorter);
  }

  render() {
    const {
      docs, columns, pagination, loading,
    } = this.state;

    return (
      <div>
        <Table
          dataSource={docs}
          columns={columns}
          pagination={pagination}
          onChange={this.handleTableChange}
          size="small"
          loading={loading}
        />
      </div>
    );
  }
}

// props validation
TableNew.propTypes = {
  onTableChange: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  loading: PropTypes.bool,
};

TableNew.defaultProps = {
  onTableChange: () => { },
  loading: false,
};
