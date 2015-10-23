"use strict";
var React = require('react');

var Fretboard = React.createClass({
  propTypes: {
    frets: React.PropTypes.array.isRequired
  },
  render: function() {
    var createFretString = function(fretString) {
      return (
        <div className="string" data-number={fretString.number} data-freq={fretString.note.freq}>
          {fretString.note.pitchClass.name}
        </div>
      );
    };

    var createFret = function(fret) {
      return (
        <div className="fret" data-number={fret.number}>
          {fret.strings.map(createFretString, this)}
        </div>
      );
    };

    return (
      <div className="fretboard">
        {this.props.frets.map(createFret, this)}
      </div>
    );
  }
});

module.exports = Fretboard;
