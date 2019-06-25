import React, { Component } from 'react';

import {
  Form, Button, Row, Col, InputNumber,
} from 'antd';

import PropTypes from 'prop-types';
import AutoCompleteSearch from './AutoCompleteSearch';

import 'react-table/react-table.css';

export default class TableSearch extends Component {
  constructor() {
    super();
    this.state = {
      selectedMake: '',
      inputMake: '',
      inputModel: '',
      clearMakeCtr: 0,
      clearModelCtr: 0,
      expand: false,
      minYear: null,
      maxYear: null,
      minPrice: null,
      maxPrice: null,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.handleMakeSelected = this.handleMakeSelected.bind(this);
    // this.handleModelSelected = this.handleModelSelected.bind(this);

    this.handleMakeInputChange = this.handleMakeInputChange.bind(this);
    this.handleModelInputChange = this.handleModelInputChange.bind(this);

    this.toggle = this.toggle.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    const { onSearch } = this.props;
    const {
      inputMake, inputModel, minYear, maxYear, minPrice, maxPrice,
    } = this.state;
    const search = {
      make: inputMake,
      model: inputModel,
      minYear,
      maxYear,
      minPrice,
      maxPrice,
    };
    onSearch(search);
  }

  handleReset() {
    const { onSearch } = this.props;
    this.setState(prev => ({
      selectedMake: '',
      inputMake: '',
      inputModel: '',
      clearMakeCtr: prev.clearMakeCtr + 1,
      clearModelCtr: prev.clearModelCtr + 1,
      minYear: null,
      maxYear: null,
      minPrice: null,
      maxPrice: null,
    }));
    onSearch({});
  }

  handleMakeSelected(value) {
    this.setState(prev => ({
      selectedMake: value,
      clearModelCtr: prev.clearModelCtr + 1,
    }));
  }

  handleMakeInputChange(value) {
    let { clearModelCtr } = this.state;
    if (value === '') {
      clearModelCtr += 1;
    }
    this.setState({
      inputMake: value,
      clearModelCtr,
    });
  }

  handleModelInputChange(value) {
    this.setState({
      inputModel: value,
    });
  }

  toggle() {
    const { expand } = this.state;
    this.setState({
      expand: !expand,
    });
  }


  render() {
    const {
      selectedMake, clearMakeCtr, clearModelCtr, expand, minYear, maxYear, minPrice, maxPrice,
    } = this.state;
    const { makes } = this.props;

    return (
      <div>
        <Form layout="inline" className="ant-advanced-search-form" onSubmit={this.handleSearch}>
          <Row>
            <Col span={18} offset={4}>
              <Form.Item label="Marka">
                <AutoCompleteSearch
                  placeholder="Ford"
                  dataSource={Object.keys(makes).sort()}
                  onSelectedValue={this.handleMakeSelected}
                  onInputChange={this.handleMakeInputChange}
                  clear={clearMakeCtr}
                />
              </Form.Item>
              <Form.Item label="Model">
                <AutoCompleteSearch
                  placeholder="Escape"
                  dataSource={makes[selectedMake] !== undefined
                    ? makes[selectedMake].sort() : undefined}
                  onInputChange={this.handleModelInputChange}
                  clear={clearModelCtr}
                />
              </Form.Item>


              <Form.Item>
                <Button type="primary" htmlType="submit" icon="search" onClick={this.handleSearch}>Szukaj</Button>
              </Form.Item>
              <Form.Item>
                <Button type="danger" icon="delete" onClick={this.handleReset}>Wyczyść</Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="dashed"
                  icon={expand ? 'up' : 'down'}
                  onClick={this.toggle}
                >
                  {expand ? 'Mniej' : 'Więcej'}
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ display: expand ? 'block' : 'none' }}>
            <Col span={5} offset={4}>
              <Form.Item label="Rok od">
                <InputNumber
                  style={{ width: 100 }}
                  onChange={(val) => { this.setState({ minYear: val === '' ? null : val }); }}
                  value={minYear}
                />
              </Form.Item>
              <Form.Item label="do">
                <InputNumber
                  style={{ width: 100 }}
                  onChange={(val) => { this.setState({ maxYear: val === '' ? null : val }); }}
                  value={maxYear}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Cena od">
                <InputNumber
                  style={{ width: 100 }}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  step={100}
                  onChange={(val) => { this.setState({ minPrice: val === '' ? null : val }); }}
                  value={minPrice}
                />
              </Form.Item>
              <Form.Item label="do">
                <InputNumber
                  style={{ width: 100 }}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  step={100}
                  onChange={(val) => { this.setState({ maxPrice: val === '' ? null : val }); }}
                  value={maxPrice}
                />
              </Form.Item>
            </Col>
          </Row>
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
