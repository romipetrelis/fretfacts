var chai = require("chai");
var expect = chai.expect;
//var sinon = require("sinon");
var FretboardService = require("../src/services/fretboardService");
var NoteService = require("../src/services/noteService");

chai.should(); // gives all objects access to the 'should' object

describe("FretboardService", function(){
  describe("getStrings", function() {

    // NOTE: stubbing out the Note Service would require a LOT of stubbing. Since that service is a local one, we'll test with an instance of it, rather than stubbing it out.

    //  beforeEach(function(){
     //
    //  });
     //
    //  afterEach(function(){
     //
    //  });

    it("should return 6 strings, with 13 notes each, when tuning and fret count are not specified", function(){

      var sut = new FretboardService(new NoteService());
      var strings = sut.getStrings();
      strings.length.should.equal(6);
      var i=0;
      while(i<6) {
        expect(strings[i].notes.length).to.equal(13);
        i++;
      }
    });

    it("should return a standard guitar tuning when tuning is not specified", function(){
      var sut = new FretboardService(new NoteService());
      var strings = sut.getStrings();

      expect(strings[0].notes[0].pitchClass.name).to.equal('E');
      expect(strings[0].notes[0].octave).to.equal(2);
      expect(strings[1].notes[0].pitchClass.name).to.equal('A');
      expect(strings[1].notes[0].octave).to.equal(2);
      expect(strings[2].notes[0].pitchClass.name).to.equal('D');
      expect(strings[2].notes[0].octave).to.equal(3);
      expect(strings[3].notes[0].pitchClass.name).to.equal('G');
      expect(strings[3].notes[0].octave).to.equal(3);
      expect(strings[4].notes[0].pitchClass.name).to.equal('B');
      expect(strings[4].notes[0].octave).to.equal(3);
      expect(strings[5].notes[0].pitchClass.name).to.equal('E');
      expect(strings[5].notes[0].octave).to.equal(4);

    });

    it("should return 6 strings, with 6 notes each, when a fret count of 5 is specified", function(){
      var sut = new FretboardService(new NoteService());
      var strings = sut.getStrings(null, 5);
      strings.length.should.equal(6);
      var i=0;
      while(i<6) {
        expect(strings[i].notes.length).to.equal(6);
        i++;
      }
    });

    // it("should return 4 properly tuned strings for a typical bass tuning", function(){
    //   var sut = new FretboardService(new NoteService());
    //   var strings = sut.getStrings(['', '', '', ''], 15);
    //
    //   expect(strings.length).to.equal(4);
    //
    // });
  });
});
