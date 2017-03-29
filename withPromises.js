import React, { Component } from 'react';

const WithPromises = tasks => WrappedComponent => class withPromises extends Component {
  constructor(props){
    super(props);
    tasks.map(task => {
      task.promise(props).then(result => task.hasOwnProperty('key') ? this.setState({[task.key]: result}) : null);
    });
  }
  shouldComponentUpdate(){
    return true;
  }
  componentWillReceiveProps(nextProps){
    tasks.map(task => {
      if(task.hasOwnProperty('shouldUpdate') && task.shouldUpdate(this.props, nextProps))
        task.promise(nextProps).then(result => task.hasOwnProperty('key') ? this.setState({[task.key]: result}) : null);
    });
  }
  render(){
    return (<WrappedComponent {...this.props} {...this.state} />);
  }
}


export default WithPromises;
