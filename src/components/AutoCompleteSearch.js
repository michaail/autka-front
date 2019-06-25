import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'antd';

import 'react-table/react-table.css';

export default class AutoCompleteSearch extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    // this.onLeave = this.onLeave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { clear } = this.props;
    if (clear !== nextProps.clear) {
      this.setState({
        value: '',
      });
    }
  }

  onChange(value) {
    const { onInputChange } = this.props;
    this.setState({
      value,
    });
    onInputChange(value);
  }

  onSelect(value) {
    const { onSelectedValue } = this.props;
    onSelectedValue(value);
  }

  // onLeave(value) {
  //   const { onInputLeave } = this.props;
  //   onInputLeave(value);
  // }

  render() {
    const { placeholder, dataSource } = this.props;
    const { value } = this.state;

    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onChange={this.onChange}
        onSelect={this.onSelect}

        filterOption={(inputValue, option) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        placeholder={placeholder}
        value={value}
        allowClear
      />
    );
  }
}

// props validation
AutoCompleteSearch.propTypes = {
  placeholder: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.string),
  clear: PropTypes.number,
  onSelectedValue: PropTypes.func,
  onInputChange: PropTypes.func,
};

AutoCompleteSearch.defaultProps = {
  placeholder: '',
  dataSource: [],
  clear: 0,
  onSelectedValue: () => {},
  onInputChange: () => {},
};
