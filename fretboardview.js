var FretboardView = function(document, fretboardService, options) {
  registerElements();

  var tuning = options || options.tuning,
    fretCount = options || options.fretCount,
    strings = fretboardService.getStrings(tuning, fretCount),
    fretboardElement = document.createElement('ff-fretboard');

  strings.forEach(function(string){
    var fretCount = string.length,
      stringElement = document.createElement('ff-string');

    for(var i = 0; i < fretCount; i++) {
      var note = string[i];
      var fretElement = document.createElement('ff-fret');
      fretElement.number = i;
      fretElement.pitchClassName = note.pitchClass.name;
      fretElement.altPitchClassName = note.pitchClass.alt;
      fretElement.freq = note.freq;
      fretElement.octave = note.octave;

      stringElement.appendChild(fretElement);
    }
    fretboardElement.appendChild(stringElement);
  });

  //TODO: change this
  document.appendChild(fretboardElement);

  function registerElements(){
    register('ff-fretboard');
    register('ff-string');
    register('ff-fret');
  }

  function register(name, options) {
    try {
      document.registerElement(name);
    }
    catch (ex){ }// already registered
  }
};

module.exports = FretboardView;
