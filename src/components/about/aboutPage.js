'use strict';
var React = require('react');

var AboutPage = React.createClass({
  render: function(){
    return (
      <div>
        <h1>About</h1>
        <p>This app was built with:
          <ul>
            <li>Node.js</li>
            <li>Gulp</li>
            <li>Mocha</li>
            <li>Chai</li>
            <li>Sinon</li>
            <li>Browserify</li>
            <li>React</li>
            <li>React Router</li>
            <li>Flux</li>
          </ul>
        </p>
      </div>
    );
  }
});

module.exports = AboutPage;
