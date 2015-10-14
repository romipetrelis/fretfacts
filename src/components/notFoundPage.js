"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var NotFoundPage = React.createClass({
  render: function(){
    return (
      <div>
        <h1>Page Not Found</h1>
        <p>Oopsie! We couldn&apos;t find the page you were looking for.</p>
        <p><Link to="app">Go back home</Link></p>
      </div>
    );
  }
});

module.exports = NotFoundPage;
