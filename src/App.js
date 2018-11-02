import React, { Component } from 'react';
import './App.css';
import Table from './components/table';
import TableSearch from './components/tableSearch';
import MenuStrip from './components/menuStrip';


class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuStrip />
        <TableSearch />
      </div>
    );
  }
}

export default App;
