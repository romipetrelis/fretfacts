'use strict';
var NoteService = function(tuningFork) {
  var PITCH_CLASSES = [ {name:'C'},{name:'C#', alt:'Db'},{name:'D'},{name:'Eb', alt:'D#'},{name:'E'},{name:'F'},{name:'F#', alt:'Gb'},{name:'G'},{name:'G#', alt:'Ab'},{name:'A'},{name:'Bb', alt:'A#'},{name:'B'}];
  var PITCH_CLASS_COUNT = 12;
  var OCTAVE_COUNT = 9;
  var allNotes = determineFrequencies(tuningFork);

  function determineFrequencies(tuningFork) {
    var freqs = create2DArray(PITCH_CLASS_COUNT, OCTAVE_COUNT);
    tuningFork = tuningFork || { note: 'A4', freq: 440 };
    var parsedNote = parseNote(tuningFork.note);
    var octave = parsedNote.octave;
    var pitchClassIndex = getPitchClassIndex(parsedNote.pitchClassName);
    freqs[octave][pitchClassIndex] = tuningFork.freq;

    var halfSteps = 0;

    // ascending from fixedNote
    for(var o = octave; o < OCTAVE_COUNT; o++) {
      for(var p = 0; p < PITCH_CLASS_COUNT; p++) {
        if (o == octave && p <= pitchClassIndex)
          continue;
        halfSteps++;
        freqs[o][p] = calculateFrequency(tuningFork.freq, halfSteps);
      }
    }

    // descending from fixedNote
    halfSteps = 0;
    for (var o = octave; o >= 0; o--) {
      for (var p = PITCH_CLASS_COUNT-1; p >= 0; p--) {
        if (o == octave && p >= pitchClassIndex)
          continue;
        halfSteps--;
        freqs[o][p] = calculateFrequency(tuningFork.freq, halfSteps);
      }
    }
    return freqs;
  }

  function calculateFrequency(fixedFrequency, halfSteps) {
    // http://www.phy.mtu.edu/~suits/NoteFreqCalcs.html
    var a = Math.pow(2, 1/12);
    return fixedFrequency * Math.pow(a, halfSteps);
  }

  function getPitchClassIndex(pitchClassName, arrayOfPitchClasses) {
    var INVALID_PITCH_CLASS = 'A valid pitchClassName must be specified. Ex: A, C#, Eb';
    pitchClassName = pitchClassName || '';

    if (pitchClassName == '')
      throw new Error(INVALID_PITCH_CLASS);

    var toFind = pitchClassName.toLowerCase();
    arrayOfPitchClasses = arrayOfPitchClasses || PITCH_CLASSES;

    var isNameOrAltMatch = function (element, index, array) {
      var alt = element.alt || '';
      return element.name.toLowerCase() == toFind || alt.toLowerCase() == toFind;
    };

    var i = arrayOfPitchClasses.findIndex(isNameOrAltMatch);
    if (i == -1) throw new Error(INVALID_PITCH_CLASS);

    return i;
  }

  function findFrequency(pitchClassName, octave) {
    var INVALID_OCTAVE = 'Requested octave is outside the available range';
    octave = octave || -1;

    if (octave > OCTAVE_COUNT-1 || octave < 0) {
      throw new Error(INVALID_OCTAVE);
    }
    var i = getPitchClassIndex(pitchClassName);
    return allNotes[octave][i];
  }

  function getPitchClassName(note) {
    var re = /\D+/;
    return re.exec(note)[0];
  }

  function getOctave(note) {
    var re = /\d+/;
    return re.exec(note)[0];
  }

  function parseNote(note) {
    return {pitchClassName: getPitchClassName(note), octave: getOctave(note)};
  }

  function getFrequency (note) {
    var parsedNote = parseNote(note);
    return findFrequency(parsedNote.pitchClassName, parsedNote.octave);
  }

  // API
  this.getFrequency = getFrequency;
  this.availablePitchClasses = Array.from(PITCH_CLASSES);
  this.parseNote = parseNote;
  this.getIndexOfPitchClass = getPitchClassIndex;
};

//TODO: move to Utils module
function create2DArray(cols, rows) {
  var toReturn = new Array(rows);
  for(var i=0; i < rows; i++){
    toReturn[i] = new Array(cols);
  }
  return toReturn;
}

module.exports = NoteService;
