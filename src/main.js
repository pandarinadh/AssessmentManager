"use strict";

var React = require("react");
var Router = require("react-router");
var routes = require("./routes");
var InitializeActions = require("./actions/initializeActions");

InitializeActions.initApp();

Router.run(routes, function(Handler){ //Router.HistoryLocation, removed from args
    React.render(<Handler />, document.getElementById('app'));
});
