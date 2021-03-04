import React, { Component } from 'react';

class ClickImage extends Component {
  getInitialState: function() {
    return { current: 0, hovered: false };
  },
  
  formatValue: function(value) {
    if (value > this.props.max || value < this.props.min) {
      return "";
    }
    
    return ("0" + value).slice(-2);;
  },
  
  increment: function(incrementValue) {
    var newValue = this.state.current + incrementValue;
    if (newValue > this.props.max || newValue < this.props.min) {
      return;
    }
    
    this.setState({ current: newValue });
  },
  
  onWheel: function(e) {
    var incrementValue = e.deltaY > 0 ? 1 : -1;
    this.increment(incrementValue);
  },
  
  getCurrentValue: function() {
    return this.state.current;
  },
  onMouseEnterHandler: function () {
    this.setState({
      hovered: true
    })
  },
  onMouseLeaveHandler: function () {
    this.setState({
      hovered: false
    })  
  },
  render: function() {
    return (
      <div className="range-picker" onWheel={this.onWheel}>
        <div className="range-picker-btnUp" onClick={this.increment.bind(this, -1)}>
          <span className="glyphicon glyphicon-chevron-up"></span>
        </div>
        <div className="range-picker-upper" style={{opacity: this.state.hovered ? 1 : 0}}>
          {this.formatValue(this.state.current-1)}
        </div>
        <div className="range-picker-delimiter"/>
        <div className="range-picker-selection" onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
          {this.formatValue(this.state.current)}
        </div>
        <div className="range-picker-delimiter"/>
        <div className="range-picker-lower" style={{opacity: this.state.hovered ? 1 : 0}}>
          {this.formatValue(this.state.current + 1)}
        </div>
        <div className="range-picker-btnDown" onClick={this.increment.bind(this, 1)}> 
          <span className="glyphicon glyphicon-chevron-down"></span>
        </div>
      </div>);
  }
}