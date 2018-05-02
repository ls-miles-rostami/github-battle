import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div className='home-container'>
        <h1>Welcome to Github battle</h1>
        <Link className='btn' to='/battle'>Battle!</Link>
      </div>
    )
  }
}
