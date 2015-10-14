"use strict";
var React = require('react');
var TuningList = require('./tuningList');
var TuningService = require('../../services/tuningService');

var InstrumentPage = React.createClass({
  getInitialState: function(){
    return {
      tunings: []
    };
  },
  componentDidMount: function(){
    if (this.isMounted()){
      var svc = new TuningService();
      this.setState({tunings: svc.getAvailableTunings()});
    }
  },
  render: function(){
      return (
        <div>
          <h1>Pick a Tuning</h1>
          <TuningList tunings={this.state.tunings} />
        </div>
      );
  }
});

module.exports = InstrumentPage;
