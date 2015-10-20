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
    var stringId = 0;
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
        var note = { id: "note_" + noteId, pitchClass: pc, octave: parseInt(octave), freq: freq };
        notesOnThisString.push(note);
        pci++;
        i++;
        noteId++;
      }
      strings.push({
        id: "string_" + stringId,
        name: openString,
        notes: notesOnThisString
      });
      stringId++;
    });
    return strings;
  }

  // API
  this.getStrings = getStrings;
};

module.exports = FretboardService;
