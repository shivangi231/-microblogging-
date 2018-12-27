import React, { Component } from 'react'
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');


class App extends Component {

handleClick = () => {
  AppActions.addItem('this is the item');
 }
  render () {
    return (
      <div className='container'>
          <div onClick={this.handleClick}>Hey</div>
      </div>
    )
  }
}

export default App
