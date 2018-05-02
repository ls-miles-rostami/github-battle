import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Battle from './components/Battle';
import Popular from './components/Popular';
import Results from './components/Results';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Nav />
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route exact path='/battle' component={Battle}/>
            <Route path='/popular' component={Popular} />
            <Route path='/battle/results' component={Results} />
            <Route render={function () {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
