import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Menu } from 'antd';

import TableSearchParent from './TableSearchParent';
import AuctionParent from './AuctionParent';
// import { from } from 'rxjs';

export default class Main extends Component {
  render() {
    return (
      <div>
        <Router>
          <HeaderMenu />

          <Route exact path="/" component={TableSearchParent} />
          <Route path="/lot" component={AuctionParent} />

        </Router>


      </div>
    );
  }
}

function HeaderMenu() {
  return (
    <Menu mode="horizontal" defaultSelectedKeys={['table']}>
      <Menu.Item key="table">
        <Link to="/">Tabela</Link>
      </Menu.Item>
      <Menu.Item key="auctions">
        <Link to="/lot">Aukcje</Link>
      </Menu.Item>
    </Menu>
  );
}
