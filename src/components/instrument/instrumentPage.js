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
      strings: []
    };
  },
  componentDidMount: function(){
    if (this.isMounted()){
      var tuningSvc = new TuningService();
      this.setState({tunings: tuningSvc.getAvailableTunings()});

      //TODO: how to react to changes in dropdown value?
      var fretboardSvc = new FretboardService(new NoteService());
      this.setState({strings: fretboardSvc.getStrings()});
    }
  },
  render: function(){
      return (
        <div>
          <h1>Pick a Tuning</h1>
          <TuningList tunings={this.state.tunings} />

          <FrettedInstrument strings={this.state.strings} />
        </div>
      );
  }
});

module.exports = InstrumentPage;
