var NoteService = require('./services/NoteService');
var FretboardService = require('./services/FretboardService');
var React = require('react');
var HomePage = require('./components/homePage');
var AboutPage = require('./components/about/aboutPage');
var Header = require('./components/common/header');
var InstrumentPage = require('./components/instrument/instrumentPage');

(function(win) {
  'use strict';
  var App = React.createClass({
    render: function(){
      var Child;
      switch(this.props.route){
        case 'about': Child = AboutPage; break;
        case 'instrument': Child = InstrumentPage; break;
        default: Child = HomePage;
      }
      return (
        <div>
          <Header/>
          <Child/>
        </div>
      );
    }
  });

  function render(){
    var route = win.location.hash.substr(1);
    React.render(<App route={route} />, document.getElementById('app'));
  }

  win.addEventListener('hashchange',  render);
  render();

}(window));
