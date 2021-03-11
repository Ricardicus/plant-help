import React, { Component } from 'react';
import Timer from "./timer"
import TimerAdder from "./timerAdder"
import $ from 'jquery';


class Timers extends Component {
  timer = null;

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      timers: []
    };
  }

  fetchTimers() {
    const timerFetchURL = "/api/timers"
    this.setState({ isFetching: true });
    fetch(timerFetchURL)
      .then(response => response.json())
      .then(result => {
        this.setState({timers: JSON.parse(result)["timers"], isFetching: false});
      })
      .catch(e => {
        console.log(e);
        this.setState({ isFetching: false});
      });
  }

  componentDidMount() {
    this.fetchTimers();
    this.timer = setInterval(
      () => this.fetchTimers(), 5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  drawTimers() {

    if ( this.state.timers.length > 0 ) {
      var container;
      console.log("Here, length: " + this.state.timers.length);
      return (this.state.timers.map(timer => (
        <Timer 
        key={timer.id} id={timer.id} update={timer.updated}
        imgUrl={timer.imgUrl} description={timer.description}
        hasImage={timer.hasImage}
        >
        </Timer>
        )
      ))
    }
    return <tr><td>"..."</td></tr>; 
  }

  render() {
    return (
      <div>
      <center>
      <table>
      <tbody>
      {this.drawTimers()}
      </tbody>
      </table>
      </center>
      <TimerAdder />
      </div>)
  };
}

export default Timers;
