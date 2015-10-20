"use strict";
var React = require("react");

var FrettedInstrument = React.createClass({
    render: function(){

      var createNote = function(note) {
        return (
          <div key={note.id} className="note">
            <div>{note.pitchClass.name}</div>
            <div>{note.freq}</div>
          </div>
        );
      };

      var createString = function(string){
        return (
          <div key={string.id} className="string">
            {string.notes.map(createNote, this)}
          </div>
        );
      };

      return (
        <div className="fretboard">
          {this.props.strings.map(createString, this)}
        </div>
      );
  }
});

module.exports = FrettedInstrument;
