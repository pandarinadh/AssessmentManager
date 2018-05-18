"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var AssessmentApi = require("../../api/assessmentApi");
var Toastr = require("toastr");
var AssessmentAction = require("../../actions/assessmentActions");

var StudentAssessmentPage = React.createClass({
   
    render: function(){

        return (
            <div className="container-fluid" style={{color: 'blue', border: '2px solid blue'}}>
             <div className="row" style={{'padding-bottom': '50'}}>
                <div className="col-lg-2">
                   <strong>StudentName: </strong> Sachin
                </div>
                <div className="col-lg-4">
                   <strong>Subject: </strong> Health Careaaaaaaaaaaaaaaaaaa
                </div>
                <div className="col-lg-6" style={{'text-align': 'right' }}>
                  Time:
                </div>
             </div>
             <div className="row">
                <div className="col-lg-5" style={{'text-align': 'right'}}>
                    Time: {Date.now()}
                </div>
             </div>
                <div className="row">
                    <div className="col-lg-5" style={{color: 'black', border: '2px solid silver', 'text-align': 'center', height: '350', 'padding-top': '100'}}>
                        <div className="row">
                            <div style={{'padding-bottom': '10' }}>
                                1. Doctor/health provider talked about reasons you might want your child to take a medicine
                            </div>
                        </div>
                        <div className="row" style={{'padding-top': '10'}}>
                                
                        </div>
                            <div className="row">
                                    <div className="col-lg-6" style={{'text-align': 'right' }}>
                                        <input type="radio">Yes</input>
                                    </div>
                                    <div className="col-lg-6" style={{'text-align': 'left' }}>
                                        <input type="radio">No</input>
                                    </div>
                            </div>
                            <div className="row" style={{'padding-top': '20'}}>
                                    <div className="col-lg-6" style={{'text-align': 'right' }}>
                                        <input type="submit"/>
                                    </div>
                            </div>
                    </div>
                    <div className="col-lg-1">
                        &nbsp;
                    </div>
                    <div className="col-lg-5" style={{border: '2px solid silver', 'padding-top': '5', 'padding-bottom': '5'}}>
                        <div className="row" style={{color: 'black', 'padding-bottom': '10', 'padding-top': '10'}}>
                            1. Doctor/health provider talked about reasons you might want your child to take a medicine
                        </div>
                        <div className="row" style={{color: 'black'}}>
                            <div className="col-lg-3">
                                <li>Not answered</li>
                            </div>
                            <div className="col-lg-9">
                                <div class="well" style={{'background-color': 'yellow', border: '2px solid silver'}}>&nbsp;</div>
                            </div>
                        </div>
                        <div className="row" style={{color: 'black', 'padding-bottom': '10', 'padding-top': '10'}}>
                            1. Doctor/health provider talked about reasons you might want your child to take a medicine
                        </div>
                        <div className="row" style={{color: 'black'}}>
                            <div className="col-lg-3">
                                    <li>Wrong</li>
                                </div>
                                <div className="col-lg-9">
                                    <div class="well" style={{'background-color': 'red', border: '2px solid silver'}}>&nbsp;</div>
                                </div>
                        </div>
                        <div className="row" style={{color: 'black', 'padding-bottom': '10', 'padding-top': '10'}}>
                            1. Doctor/health provider talked about reasons you might want your child to take a medicine
                        </div>
                        <div className="row" style={{color: 'black'}}>
                            <div className="col-lg-3">
                                    <li>Correct</li>
                                </div>
                                <div className="col-lg-9">
                                    <div class="well" style={{'background-color': 'green', border: '2px solid silver'}}>&nbsp;</div>
                                </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = StudentAssessmentPage;