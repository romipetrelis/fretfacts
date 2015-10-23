'use strict';
var FretboardService = function(noteService) {
  var INVALID_FRET_COUNT = 'Fret count must be creater than 0'
  var getStrings = function (tuning, fretCount) {
    tuning = tuning || ['E2','A2','D3','G3','B3','E4'];
    fretCount = fretCount || 12;

    if (fretCount < 1)
      throw new Error(INVALID_FRET_COUNT);

    var pitchClasses = noteService.availablePitchClasses;
    var pitchClassCount = pitchClasses.length;
    var strings = [];
    var noteId = 0;
    var stringId = tuning.length;
    tuning.forEach(function(openString) {
      var parsedNote = noteService.parseNote(openString); // Ex: { pitchClassName: 'E', octave: 2 }
      var octave = parsedNote.octave;
      var pci = noteService.getIndexOfPitchClass(parsedNote.pitchClassName, pitchClasses);
      var notesOnThisString = [];
      var i = 0;
      while (i <= fretCount) {
        if (pci == pitchClassCount) {
          pci = 0;
          octave++;
        }
        var pc = pitchClasses[pci];
        var freq = noteService.getFrequency(pc.name + octave);
        var note = { id: "note_" + noteId, pitchClass: pc, octave: parseInt(octave), freq: freq, fret: i };
        notesOnThisString.push(note);
        pci++;
        i++;
        noteId++;
      }
      strings.push({
        id: "string_" + stringId,
        number: parseInt(stringId),
        name: openString,
        notes: notesOnThisString
      });
      stringId--;
    });
    return strings;
  };

  var getFrets = function(tuning, fretCount) {
    var mapString = function(elem, index, array) {
      var stringNumber = elem.number;
    	var mapNote = function(elem, index, array) {
        var enriched = {stringNumber: stringNumber, fretNumber: elem.fret, note: elem };
        return enriched;
      };
      return elem.notes.map(mapNote);
    };
    var concatStrings = function(prev, curr) { return prev.concat(curr);};
    //var descStringSorter = function(a, b) { return b.stringNumber - a.stringNumber;};
    var ascStringSorter = function(a, b) { return a.stringNumber - b.stringNumber;};
    var ascFretSorter = function(a,b){ return a.fretNumber - b.fretNumber;};
    var groupByFret = function(prev, curr, index, array){
      var target;
      if (!prev.hasOwnProperty("frets")){
        target = {frets: []};
        target.frets.push(
          {number: prev.fretNumber,
            strings: [
              { number: prev.stringNumber, note: prev.note }
            ]
          }
        );
      }
      else{
        target = prev;
      }

      var toFind = curr.fretNumber;
      var isMatch = function(element){return element.number == toFind;};
      var fretIndex = target.frets.findIndex(isMatch);
      if (fretIndex >= 0){
        target.frets[fretIndex].strings.push(
          {number: curr.stringNumber, note: curr.note}
        );
      }
      else{
        target.frets.push({
          number: curr.fretNumber,
          strings: [
            {number: curr.stringNumber, note: curr.note}
          ]
        });
      }
      return target;
    };

    var strings = getStrings(tuning, fretCount);
    return strings.map(mapString).reduce(concatStrings).sort(ascStringSorter).sort(ascFretSorter).reduce(groupByFret).frets;
  };

  // API
  this.getStrings = getStrings;
  this.getFrets = getFrets;
};

module.exports = FretboardService;
