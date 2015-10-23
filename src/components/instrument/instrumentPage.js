"use strict";
var React = require('react');
var TuningList = require('./tuningList');
var FrettedInstrument = require('./frettedInstrument');
var Fretboard = require("./fretboard");
var TuningService = require('../../services/tuningService');
var FretboardService = require("../../services/fretboardService");
var NoteService = require("../../services/noteService");

var InstrumentPage = React.createClass({
  getInitialState: function(){
    return {
      tunings: [],
      frets: [],
      initialTuning: ""
    };
  },
  componentWillMount: function(){
    //TODO: is it acceptable to do this from within componentWillMount?
    // if we do it in componentDidMount, then initialValue is not available in tuningList until render()
    var tuningSvc = new TuningService();
    var tunings = tuningSvc.getAvailableTunings();
    var initialTuning = tunings[0].options[0].tuning.join(",");

    this.setState({
      tunings: tunings,
      initialTuning: initialTuning
    });

    this.handleTuningSelectionChanged(initialTuning);
  },
  handleTuningSelectionChanged: function(newValue) {
    if (newValue.length == 0){
      this.setState({frets: []});
      return;
    }
    var tuning = newValue.split(",");
    var fretboardSvc = new FretboardService(new NoteService());
    var frets = fretboardSvc.getFrets(tuning);
    this.setState({
      frets: frets
    });
  },
  render: function(){
    return (
      <div>
        <h1>Fretted Instrument</h1>
        <TuningList tunings={this.state.tunings} initialValue={this.state.initialTuning} onSelectionChanged={this.handleTuningSelectionChanged} />
        <Fretboard frets={this.state.frets} />
      </div>
    );
  }
});

module.exports = InstrumentPage;
