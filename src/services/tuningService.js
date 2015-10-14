var TuningService = function(){
  // https://en.wikipedia.org/wiki/Stringed_instrument_tunings
  var AVAILABLE_TUNINGS = [
    {
      category: 'Guitar',
      options: [
        { id: 'guitar-1', name: 'Standard', tuning: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']},
        { id: 'guitar-2', name: 'Open D', tuning: ['D2', 'A2', 'D3', 'F#3', 'A3', 'D4']},
        { id: 'guitar-3', name: 'Open C', tuning: ['C2', 'E2', 'G3', 'C3', 'E3', 'G4']}
      ]
    },
    {
      category: 'Bass Guitar',
      options: [
        { id: 'bass-guitar-1', name: '4 String', tuning: ['E1', 'A1', 'D2', 'G2']},
        { id: 'bass-guitar-2',name: '5 String', tuning: ['B0', 'E1', 'A1', 'D2', 'G2']},
        { id: 'bass-guitar-3',name: '5 String (tenor)', tuning: ['E1', 'A1', 'D2', 'G2', 'C3']},
        { id: 'bass-guitar-4',name: '6 String', tuning: ['B0', 'E1', 'A1', 'D2', 'G2', 'C3']}
      ]
    },
    {
      category: 'Banjo',
      options: [
        { id: 'banjo-1', name: 'Standard', tuning: ['G4', 'D3', 'G3', 'B3', 'D4']},
        { id: 'banjo-2', name: 'C Tuning', tuning: ['G4', 'C3', 'G3', 'B3', 'D4']},
        { id: 'banjo-3', name: 'Double C', tuning: ['G4', 'C3', 'G3', 'C3', 'D4']},
        { id: 'banjo-4', name: 'Sawmill', tuning: ['G4', 'D3', 'G3', 'C3', 'D4']},
        { id: 'banjo-5', name: 'Open D', tuning: ['F#4', 'D3', 'F#3', 'A3', 'D4']},
        { id: 'banjo-6', name: 'Guitar', tuning: ['G4', 'D3', 'G3', 'B3', 'E4']},
        { id: 'banjo-7', name: 'Willie Moore', tuning: ['G4', 'D3', 'G3', 'A3', 'D4']},
        { id: 'banjo-8', name: "Doc Bog's D", tuning: ['F#4', 'D3', 'G3', 'A3', 'D4']},
        { id: 'banjo-9', name: 'Cumberland Gap', tuning: ['G4', 'E3', 'A3', 'D3', 'E4']},
        { id: 'banjo-10', name: 'G Minor', tuning: ['G4', 'D3', 'G3', 'Bb3', 'D4']},
        { id: 'banjo-11', name: 'Open C', tuning: ['G4', 'C3', 'G3', 'C3', 'E4']}
      ]
    },
    {
      category: 'Banjo-Bass',
      options: [
        { id: 'banjo-bass-1', name: 'Standard', tuning: ['E1', 'A1', 'D2', 'G2']}
      ]
    },
    {
      category: 'Banjo-Cello',
      options: [
        { id: 'banjo-cello-1', name: '4 String', tuning: ['C2', 'G2', 'D3', 'A3']},
        { id: 'banjo-cello-2', name: '5 String', tuning: ['G3', 'D2', 'B2', 'D3']}
      ]
    }
  ];

  this.getAvailableTunings = function(){
    return AVAILABLE_TUNINGS;
  };
};

module.exports = TuningService;
