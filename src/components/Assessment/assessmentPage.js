"use strict";

var React = require("react");
var Link = require("react-router").Link;
var AssessmentList = require("./assessmentList");
var AssessmentApi = require("../../api/assessmentApi");
var AssessmentStore = require("../../store/assessmentStore");

var assessmentPage = React.createClass({

    getInitialState: function() {
        console.log('getInitialState in assessmentPage');
        return {
            assessments: AssessmentStore.getAllAssessments(),
            errors: {},
            dirty: false,
            checkBoxFlag: false
        };
    },

    componentWillMount: function() {
        //debugger;
        console.log('componentWillMount in assessmentPage');
        AssessmentStore.addChangeListener(this._onChange);
    },
 
    componentWillUnmount: function() {
      //  debugger;
      console.log('componentWillUnmount in assessmentPage');
      AssessmentStore.removeChangeListener(this._onChange);
    },
    
    _onChange: function(){
        //debugger;
        console.log('onchange in assessmentPage');
        this.setState({assessments: AssessmentStore.getAllAssessments() });
    },
    

    render: function(){
        return (
            <div>
                <h1>Assessment Page </h1>
                <div>
                    <p><Link to="addAssessment" className = "btn btn-default" > Add Assessment </Link> </p>
                    <AssessmentList assessments = {this.state.assessments} checkBoxFlag = {this.state.checkBoxFlag} />
                </div>
            </div>
        );
    }
});

module.exports = assessmentPage;


