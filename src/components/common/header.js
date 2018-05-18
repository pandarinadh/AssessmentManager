"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var Header = React.createClass({
    render: function(){
        return (
            <nav className = "navbar navbar-default"> 
                <div className = "container-fluid">
                    <Link to="app" className="navbar-brand"> Home </Link>
                    <ul className ="nav navbar-nav">
                        <li> <Link to="app">Home </Link></li>
                        <li> <Link to="questions">Question </Link></li>
                        <li> <Link to="assessments">Assessment </Link></li>
                        <li> <Link to="students">Student </Link></li>
                        <li> <Link to="studentAssessments">Assessment Center </Link></li>
                    </ul>
                    
                </div>
            </nav>
        );
    }
});

module.exports = Header;