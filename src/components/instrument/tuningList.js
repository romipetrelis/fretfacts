var React = require('react');

var TuningList = React.createClass({
  propTypes: {
    tunings: React.PropTypes.array.isRequired
  },
  render: function(){
    var createTuningOption = function(tuningOption) {
      return (
        <option key={tuningOption.id} value={tuningOption.tuning}>{tuningOption.name}</option>
      );
    };
    var createTuningOptionGroup = function(tuningGroup) {
      return (
        <optgroup key={tuningGroup.category} label={tuningGroup.category}>
          {tuningGroup.options.map(createTuningOption, this)}
        </optgroup>
      );
    };

    return (
      <select>
        {this.props.tunings.map(createTuningOptionGroup, this)}
      </select>
    );
  }
});

module.exports = TuningList;
