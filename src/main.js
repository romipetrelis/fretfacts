"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

Router.run(routes, Router.HistoryLocation, // uses HTML5 History API instead of hash
  function(Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
