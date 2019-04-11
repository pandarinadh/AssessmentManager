"use strict";

var React = require("react");
var Link = require("react-router").Link;
var StudentList = require("./studentList");
var StudentStore = require("../../flux/store/studentStore");

var StudentPage = React.createClass({

    getInitialState: function() {
        console.log('getInitialState in studentPage');
        return {
            students: StudentStore.getAllStudents(),
            errors: {},
            dirty: false
        };
    },

    componentWillMount: function() {
        //debugger;
        console.log('componentWillMount in studentPage');
        StudentStore.addChangeListener(this._onChange);
    },
 
    componentWillUnmount: function() {
      //  debugger;
      console.log('componentWillUnmount in studentPage');
      StudentStore.removeChangeListener(this._onChange);
    },
    
    _onChange: function(){
        //debugger;
        console.log('onchange in studentPage');
        this.setState({students: StudentStore.getAllStudents() });
    },
    

    render: function(){
        return (
            <div>
                <h1>Student Page </h1>
                <div>
                    <p><Link to="addStudent" className = "btn btn-default" > Add Student </Link> </p>
                    <StudentList students = {this.state.students} setStudentState = {this.setStudentState} saveStudent = {this.saveStudent} />
                </div>
            </div>
        );
    }
});

module.exports = StudentPage;




