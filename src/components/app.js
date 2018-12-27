import React from 'react';
import classes from './app.scss';
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      disable: true,
      submitFlag: false,
      value: undefined
    }
  }

    handleClick = () => {
      AppActions.addItem('this is the item');
    }

    submitTweet = () => {
      this.setState({
        submitFlag : true
      })
    }

    onChangeText = (e) => {
      console.log('e.target.value', e.target.value.length);
      if(e.target.value && e.target.value.length !=0) {
        this.setState({
          disable: false,
          value:e.target.value
        })
      } else {
        this.setState({
          disable: true
        })
      }

    }
    render(){
      return (
      <div className="wrapper" align="center">
      {this.state.submitFlag ?
        <div>
          Your Tweet is ​sucessfully published.
        </div> :
        <div>
        <div>
          <textarea rows="4" cols="50" maxlength="140" className="textarea-align" onChange={this.onChangeText}>
          </textarea>
        </div>
        <button className="button-wrapper" disabled={this.state.disable} onClick={this.submitTweet}>Submit</button>
        </div> }
      </div>
      )
    }
  }


export default App;
