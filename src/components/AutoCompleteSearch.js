import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AutoComplete } from 'antd';
// import ReactTable from 'react-table';

import 'react-table/react-table.css';


function onSelect(value) {
  console.log('onSelect', value);
}

export default class AutoCompleteSearch extends Component {
  state = {
    dataSource: [],
  }

  handleSearch = (value) => {

  }

  render() {
    const { dataSource } = this.state;
    const { placeholder } = this.props;

    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={this.handleSearch}
        placeholder={placeholder}
      />
    );
  }
}

// props validation
AutoCompleteSearch.propTypes = {
  placeholder: PropTypes.string,
};

AutoCompleteSearch.defaultProps = {
  placeholder: '',
};
