"use strict";
var React = require('react');
var TuningList = require('./tuningList');
var FrettedInstrument = require('./frettedInstrument');
var TuningService = require('../../services/tuningService');
var FretboardService = require("../../services/fretboardService");
var NoteService = require("../../services/noteService");

var InstrumentPage = React.createClass({
  getInitialState: function(){
    return {
      tunings: [],
      strings: [],
      initialTuning: ""
    };
  },
  componentDidMount: function(){
    if (this.isMounted()){
      var tuningSvc = new TuningService();
      var tunings = tuningSvc.getAvailableTunings();
      var initialTuning = tunings[0].options[0].tuning.join(",");

      this.setState({
        tunings: tunings,
        initialTuning: initialTuning
      });
    }
  },
  handleTuningSelectionChanged: function(newValue) {
    if (newValue.length == 0){
      this.setState({strings: []});
      return;
    }
    var tuning = newValue.split(",");
    var fretboardSvc = new FretboardService(new NoteService());
    var strings = fretboardSvc.getStrings(tuning);
    this.setState({
      strings: strings
    });
  },
  render: function(){
    return (
      <div>
        <h1>Fretted Instrument</h1>
        <TuningList tunings={this.state.tunings} initialValue={this.state.initialTuning} onSelectionChanged={this.handleTuningSelectionChanged} />
        <FrettedInstrument strings={this.state.strings} />
      </div>
    );
  }
});

module.exports = InstrumentPage;
