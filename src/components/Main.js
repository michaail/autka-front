import React, { Component } from 'react';
// import Table from './Table';
import TableNew from './TableNew';
import MenuStrip from './MenuStrip';
import TableSearch from './TableSearch';

export default class Main extends Component {
  

  handleChildFunc() {
    
  }
  
  render() {
    return (
      <div>
        <h1>Main container</h1>
        <MenuStrip myFunc={this.handleChildFunc}/>
        <TableSearch /> 
        <TableNew />
      </div>
    );
  }
}
