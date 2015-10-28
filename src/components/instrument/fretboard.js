"use strict";
var React = require('react');

var Fretboard = React.createClass({
  propTypes: {
  },
  render: function() {
    var createFretString = function(fretString) {
      return (
        <div className="string" data-number={fretString.number} data-freq={fretString.note.freq} key={fretString.number}>
          {fretString.note.pitchClass.name}
        </div>
      );
    };

    var createFret = function(fret) {
      var className = "fret-".concat(fret.number);
      return (
        <div className={className} data-number={fret.number} key={fret.number}>
          {fret.strings.map(createFretString, this)}
        </div>
      );
    };

    var createNut = function(nut){
      return (
        <div className="nut" key={nut.number}>
          {nut.strings.map(createFretString)}
        </div>
      );
    };

    var nut = this.props.frets.shift();

    return (
      <div className="fretboard">
        {createNut(nut)}
        {this.props.frets.map(createFret, this)}
      </div>
    );
  }
});

module.exports = Fretboard;
