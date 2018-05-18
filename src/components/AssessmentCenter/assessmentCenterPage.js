"use strict";

var React = require("react");
var Link = require("react-router").Link;
var AssessmentCenterList = require("./assessmentCenterList");
var AssessmentCenterStore = require("../../store/assessmentCenterStore");

var AssessmentCenterPage = React.createClass({

    getInitialState: function() {
        console.log('getInitialState in AssessmentCenterPage');
        return {
            studentAssessments: AssessmentCenterStore.getAllStudentAssessments(),
            errors: {},
            dirty: false
        };
    },

    componentWillMount: function() {
        //debugger;
        console.log('componentWillMount in AssessmentCenterPage');
        AssessmentCenterStore.addChangeListener(this._onChange);
    },
 
    componentWillUnmount: function() {
      //  debugger;
      console.log('componentWillUnmount in AssessmentCenterPage');
      AssessmentCenterStore.removeChangeListener(this._onChange);
    },
    
    _onChange: function(){
        //debugger;
        console.log('onchange in AssessmentCenterPage');
        this.setState({studentAssessments: AssessmentCenterStore.getAllStudentAssessments() });
    },
    

    render: function(){
        return (
            <div>
                <h1>Assessment Page </h1>
                <div>
                    <p><Link to="addAssessment" className = "btn btn-default" > Add Assessment </Link> </p>
                    <AssessmentCenterList studentAssessments = {this.state.studentAssessments} />
                </div>
            </div>
        );
    }
});

module.exports = AssessmentCenterPage;


