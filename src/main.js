"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

// passing Router.HistoryLocation as optional 2nd parameter causes the router to use HTML5 History API instead of hash
// but it breaks 404 (at least as presently configured), so reverting to hash for now
Router.run(routes, // Router.HistoryLocation,
  function(Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
