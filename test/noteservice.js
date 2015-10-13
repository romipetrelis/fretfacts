var chai = require("chai");
var expect = chai.expect;
var NoteService = require("../services/noteservice");

chai.should(); // gives all objects access to the 'should' object

describe("NoteService", function(){
  describe("getFrequency", function() {

    it("should identify the frequency of A4 as 440 when no tuningFork is specified", function() {
      var sut = new NoteService();
      var f = sut.getFrequency("A4");
      expect(f).to.equal(440);
    });

    it("should identify the frequency of A4 as 434 when tuningFork A4/434 is specified", function() {
      var sut = new NoteService({note:"A4", freq: 434});
      var f = sut.getFrequency("A4");
      expect(f).to.equal(434);
    });

    it("should identify increasingly larger frequencies for each note across 9 octaves", function() {
      var sut = new NoteService();

      var pitchClassNames = ["C","C#","D","Eb","E","F","F#","G","G#","A","Bb","B"];
      var octave = 0;
      var prevFreq = -1;
      while(octave < 9) {

        pitchClassNames.forEach(function(pitchClassName){
          var freq = sut.getFrequency(pitchClassName + octave);
          expect(freq).to.be.above(prevFreq);
          prevFreq = freq;
        });
        octave++;
      }
    });

    it("should identify the frequency of a note by either its common or alternative name", function() {
      var sut = new NoteService();

      var asharp2 = sut.getFrequency("A#2");
      var bflat2 = sut.getFrequency("Bb2");
      expect(asharp2).to.equal(bflat2);

      var csharp5 = sut.getFrequency("C#5");
      var dflat5 = sut.getFrequency("db5");
      expect(csharp5).to.equal(dflat5);

      var dsharp1 = sut.getFrequency("d#1");
      var eflat1 = sut.getFrequency("Eb1");
      expect(dsharp1).to.equal(eflat1);

      var fsharp3 = sut.getFrequency("F#3");
      var gflat3 = sut.getFrequency("Gb3");
      expect(fsharp3).to.equal(gflat3);

      var gsharp4 = sut.getFrequency("G#4");
      var aflat4 = sut.getFrequency("Ab4");
      expect(gsharp4).to.equal(aflat4);
    });

    it("should throw an error when pitchClassName is invalid", function(){
      var sut = new NoteService();
      var f = function(){
        sut.getFrequency("J4");
      };
      expect(f).to.throw(Error);
    });

    it("should throw an error when octave is out of range", function(){
      var sut = new NoteService();
      var f = function(){
        sut.getFrequency("A9");
      };
      expect(f).to.throw(Error);
    });

  });

  describe("getIndexOfPitchClass", function(){

  });

  describe("availablePitchClasses", function(){

  });
  describe("parseNote", function(){

  });
});
