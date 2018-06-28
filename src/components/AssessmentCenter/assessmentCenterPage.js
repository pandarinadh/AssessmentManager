"use strict";

var React = require("react");
var Link = require("react-router").Link;
var AssessmentCenterList = require("./assessmentCenterList");
var AssessmentCenterStore = require("../../store/assessmentCenterStore");
var StudentStore = require("../../store/studentStore");

var AssessmentCenterPage = React.createClass({

    getInitialState: function() {
        console.log('getInitialState in AssessmentCenterPage');
        return {
            students: StudentStore.getAllStudents(),
            errors: {},
            dirty: false
        };
    },

    componentWillMount: function() {
        //debugger;
        console.log('componentWillMount in AssessmentCenterPage');
        StudentStore.addChangeListener(this._onChange);
    },
 
    componentWillUnmount: function() {
      //  debugger;
      console.log('componentWillUnmount in AssessmentCenterPage');
      StudentStore.removeChangeListener(this._onChange);
    },
    
    _onChange: function(){
        //debugger;
        console.log('onchange in AssessmentCenterPage');
        this.setState({students: StudentStore.getAllStudents() });
    },
    

    render: function(){
        return (
            <div>
                <h1>Assessment Page </h1>
                <div>
                    <p><Link to="addAssessment" className = "btn btn-default" > Add Assessment </Link> </p>
                    <AssessmentCenterList students = {this.state.students} />
                </div>
            </div>
        );
    }
});

module.exports = AssessmentCenterPage;


