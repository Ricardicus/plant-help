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
    this.setState({ isFetching: true });
    $("#loader").show();
    fetch(updateURL)
      .then(response => response.json())
      .then(result => {
        this.setState({isFetching: false})
        $("#" + this.timerID()).html("Just now");
        $("#loader").hide();
      })
      .catch(e => {
        console.log(e);
        this.setState({ isFetching: false});
        $("#loader").hide();
      });
  }

  handleRemove = () => {
    const updateURL = "/api/timerRemove/" + this.props.id;
    console.log(updateURL);
    this.setState({ isFetching: true });
    $("#loader").show();
    fetch(updateURL)
      .then(response => response.json())
      .then(result => {
        this.setState({isFetching: false})
        $("#loader").hide();
      })
      .catch(e => {
        console.log(e);
        this.setState({ isFetching: false});
        $("#loader").hide();
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

  timerDeleteID () {
    return "timer-del-" + this.props.id.toString();
  }

  timerUpdateID () {
    return "timer-upd-" + this.props.id.toString();
  }

  getImage() {
    if ( this.props.hasImage == true ) {
      return (
        <td>
        <img class="timer-img" src={this.props.imgUrl} />
        </td>
        );
    }
    return <td></td>;
  }

  onMouseEnterHandler (id) {
    $('#' + id).css('opacity', '0.2');
  }

  onMouseLeaveHandler (id) {
    $('#' + id).css('opacity', '1.0');
  }

  render () {
    return (
      <tr class="timer-record">
        {this.getImage()}
        <td>
        <p class="timer-desc">{this.props.description}</p>
        </td>
        <td id={this.timerID()}>{this.getUpdateTime()}</td>
        <td>
        <img id={this.timerUpdateID()} class="timer-ctrl-img overout"
          onClick={ () => {this.handleUpdate();} }
          onMouseEnter={ () => {this.onMouseEnterHandler(this.timerUpdateID());} }
          onMouseLeave={ () => {this.onMouseLeaveHandler(this.timerUpdateID());} }
          src="/waterIcon.png" />
        </td>
        <td>
        <img id={this.timerDeleteID()} class="timer-ctrl-img overout"
          onClick={ () => {this.handleRemove();} }
          onMouseEnter={ () => {this.onMouseEnterHandler(this.timerDeleteID());} }
          onMouseLeave={ () => {this.onMouseLeaveHandler(this.timerDeleteID());} }
          src="/minus.png" />
        </td>
      </tr>
    );
  }

}

export default Timer;
