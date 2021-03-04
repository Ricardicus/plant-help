import React, { Component } from 'react';
import $ from 'jquery';

class Timer extends Component {
  styles = {
    fontSize: 15,
    fontWeight: "bold"
  };

  constructor(props) {
    super(props);
    console.log(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      isFetching: false,
      latest: null
    };
  }

  handleUpdate = () => {
    const updateURL = "/api/timerUpdate/" + this.props.id;
    console.log(updateURL);
    this.setState({ isFetching: true });
    fetch(updateURL)
      .then(response => response.json())
      .then(result => {
        this.setState({isFetching: false})
        $("#" + this.timerID()).html("Just now");
      })
      .catch(e => {
        console.log(e);
        this.setState({ isFetching: false});
      });
  }

  getBadgeClasses() {
/*    let classes = "bagde m-2 badge-";
    classes += this.state.value === 0 ? "warning" : "primary";
    return classes; */
    return "";
  }

  getUpdateTime() {
    if ( this.props.update === undefined ) {
      return "...";
    }
    return this.props.update;
  }

  timerID () {
    return "timer-" + this.props.id.toString();
  }

  render () {
    return (
      <tr>
        <td>
        {this.props.children}
        </td>
        <td id={this.timerID()}>{this.getUpdateTime()}</td>
        <td>
        <button
          onClick={ () => {this.handleUpdate();} }
          className="btn btn-secondary btn-sm">Update</button>
        </td>
      </tr>
    );
  }

}

export default Timer;
