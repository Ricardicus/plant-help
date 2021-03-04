import React, { Component } from 'react';
import $ from 'jquery';


class TimerAdder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      description: "Description",
      imgUrl: "Image URL"
    };
  }

  updateImgUrlValue(evt) {
    this.setState({
      imgUrl: evt.target.value
    });
  }

  updateDescriptionValue(evt) {
    this.setState({
      description: evt.target.value
    });
  }

  handleAdd() {
    const newImageUrl = this.state.imgUrl;
    const newDesc = this.state.description;
    const newFields = { "imgUrl" : newImageUrl, "description" : newDesc };

    $("#loader").show();
    this.setState({isFetching: true})
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( newFields )
    };

    fetch('/api/timerNew', requestOptions)
        .then(response => response.json())
        .then(data => { 
          this.setState({isFetching: false});
          $("#loader").hide();
        })
        .catch(e => {
        console.log(e);
        this.setState({ isFetching: false});
        $("#loader").hide();
      });
  }

  render() {

    return (
      <div>
      <center>
      <table>
      <tbody>
      <tr>
      <td><input type="text" id="newImgUrl" defaultValue="Image URL" onChange={ evt => this.updateImgUrlValue(evt)} /></td>
      <td><input type="text" id="newDesc" defaultValue="Description" onChange={ evt => this.updateDescriptionValue(evt)} /></td>
      <td><img id="addBtn" class="timer-ctrl-img overout"
          onClick={ () => {this.handleAdd();} }
          onMouseEnter={ () => { $('#addBtn').css('opacity', '0.2');} }
          onMouseLeave={ () => { $('#addBtn').css('opacity', '1.0');} }
          src="/plus.png" /></td>
      </tr>
      </tbody>
      </table>
      </center>
      </div>)
  };
}

export default TimerAdder;
