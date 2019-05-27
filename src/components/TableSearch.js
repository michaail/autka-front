import React, { Component } from 'react';

import { Form, Button, Input } from 'antd';

import PropTypes, { func } from 'prop-types';
import AutoCompleteSearch from './AutoCompleteSearch';

import conf from '../conf';

import 'react-table/react-table.css';

export default class TableSearch extends Component {
  constructor() {
    super();
    this.state = {
      selectedMake: '',
      selectedModel: '',
      inputMake: '',
      inputModel: '',
      clearMakeCtr: 0,
      clearModelCtr: 0,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.handleMakeSelected = this.handleMakeSelected.bind(this);
    this.handleModelSelected = this.handleModelSelected.bind(this);

    this.handleMakeInputLeave = this.handleMakeInputLeave.bind(this);
    this.handleModelInputLeave = this.handleModelInputLeave.bind(this);
  }

  handleSearch() {
    const { onSearch } = this.props;
    const { inputMake, inputModel } = this.state;
    const search = {
      make: inputMake,
      model: inputModel,
    };
    onSearch(search);
  }

  handleReset() {
    console.log('clear');
    this.setState(prev => ({
      selectedMake: '',
      selectedModel: '',
      inputMake: '',
      inputModel: '',
      clearMakeCtr: prev.clearMakeCtr + 1,
      clearModelCtr: prev.clearModelCtr + 1,
    }));
  }

  handleMakeSelected(value) {
    this.setState(prev => ({
      selectedMake: value,
      clearModelCtr: prev.clearModelCtr + 1,
    }));
  }

  handleModelSelected(value) {
    this.setState({
      selectedModel: value,
    });
  }

  handleMakeInputLeave(value) {
    this.setState({
      inputMake: value,
    });
  }

  handleModelInputLeave(value) {
    this.setState({
      inputModel: value,
    });
  }


  render() {
    const { selectedMake, clearMakeCtr, clearModelCtr } = this.state;
    const { makes } = this.props;

    return (
      <div className="TableSearch">
        <Form layout="inline">
          <Form.Item label="Marka">
            <AutoCompleteSearch
              placeholder="Ford"
              dataSource={Object.keys(makes).sort()}
              onSelectedValue={this.handleMakeSelected}
              onInputLeave={this.handleMakeInputLeave}
              clear={clearMakeCtr}
            />
          </Form.Item>
          <Form.Item label="Model">
            <AutoCompleteSearch
              placeholder="Escape"
              dataSource={makes[selectedMake] !== undefined ? makes[selectedMake].sort() : undefined}
              onSelectedValue={this.handleModelSelected}
              onInputLeave={this.handleModelInputLeave}
              clear={clearModelCtr}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon="search" onClick={this.handleSearch}>Szukaj</Button>
          </Form.Item>
          <Form.Item>
            <Button type="danger" icon="delete" onClick={this.handleReset}>Wyczyść</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

// props validation
TableSearch.propTypes = {
  makes: PropTypes.objectOf(PropTypes.object),
  onSearch: PropTypes.func,
};

TableSearch.defaultProps = {
  makes: {},
  onSearch: () => { },
};
