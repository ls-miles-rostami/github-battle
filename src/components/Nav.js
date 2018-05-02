import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <ul className='nav'>
      <li>
        <NavLink exact activeClassName='selected' to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName='selected' to='/battle'>Battle</NavLink>
      </li>
      <li>
        <NavLink activeClassName='selected' to='/popular'>Popular</NavLink>
      </li>
    </ul>
    )
  }
}
