var React = require('react');

var TuningList = React.createClass({
  propTypes: {
    tunings: React.PropTypes.array.isRequired,
    onSelectionChanged: React.PropTypes.func
  },
  getInitialState: function(){
    return {
      selectedValue: this.props.initialValue
    }
  },
  handleChange: function(event) {
    var newValue = event.target.value;
    this.setState({selectedValue: newValue});

    if (typeof this.props.onSelectionChanged == 'function'){
      this.props.onSelectionChanged(newValue);
    }
  },
  render: function(){
    var createTuningOption = function(tuningOption) {
      var value = tuningOption.tuning.join(",");
      return (
        <option key={tuningOption.id} value={value}>{tuningOption.name}</option>
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
      <div>
        <select value={this.state.selectedValue} onChange={this.handleChange}>
          {this.props.tunings.map(createTuningOptionGroup, this)}
        </select>
      </div>
    );
  }
});

module.exports = TuningList;
