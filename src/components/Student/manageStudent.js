"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var Toastr = require("toastr");
var StudentStore = require("../../flux/store/studentStore");
var StudentActions = require("../../flux/actions/studentActions");
var StudentForm = require("./studentForm");
var AssessmentList = require('../Assessment/assessmentList');
var AssessmentStore = require("../../flux/store/assessmentStore");
var _ = require("lodash");

var ManageStudentPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function(){
        console.log('getInitialState ManageStudentPage');
        var localInitStudent = {Id: '', Name: '', Address: '', City: '', State: '', Zip: '', Assessments: [] };
        var studentId = this.props.params.id;
        var localAssessments = AssessmentStore.getAllAssessments();
        if(studentId){
            localInitStudent = StudentStore.getStudentById(studentId);
        }
        return {
            student: localInitStudent,
            showId: false,
            assessments: localAssessments,
            checkBoxFlag: true
        };
    },

    componentWillMount: function(){
        var studentId = this.props.params.id;
        var currentComponent = this;

        if(studentId){
            this.setState({ student: StudentStore.getStudentById(studentId), showId: true });
        }
        StudentStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){

        StudentStore.addChangeListener(this._onChange);
    },

    _onChange: function(){
        //debugger;
        console.log('onchange in ManageStudentPage');
        var studentId = this.props.params.id;
        if(studentId){
            this.setState({student: StudentStore.getStudentById(studentId), showId: true });
        }

        var localAssessments = AssessmentStore.getAllAssessments();
        this.setState({assessments: localAssessments});

    },

    setAssessmentState: function (event) {
          //debugger;
          var field = event.target.name;
          if(event.target.checked){
              var localAssessment = _.find(this.state.assessments, {Id: parseInt(field)});
              if(!this.state.student.Assessments){
                this.state.student.Assessments = [];
              }
              var studentAssessment = _.find(this.state.student.Assessments, {Id: parseInt(field)});
              if(studentAssessment){
                  var existingStudentAssessmentIndex = _.indexOf(this.state.student.Assessments, studentAssessment);
                  this.state.student.Assessments.splice(existingStudentAssessmentIndex, localAssessment);
              } else {
                  this.state.student.Assessments.push(localAssessment);
              }
          }
          else
          {
              _.remove(this.state.student.Assessments, function(assessment){
                  return parseInt(field) === parseInt(assessment.Id);
              });
          }
  
          return this.setState({student: this.state.student});
      },
  

    setStudentState: function (event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.student[field] = value;
        //this.state.student.Id = "-1";
        return this.setState({student: this.state.student});
    },

    saveStudent: function(event){
        event.preventDefault();
        console.log(this.state.student);
         StudentActions.saveStudent(this.state.student);
         Toastr.success("student saved");
        this.transitionTo("students");
    },

    render: function(){

        var myStyle = this.state.showId ? 'inline' : 'none';

        var localAssessmentList = this.state.student ? this.state.student.Assessments : [];
        
        var localStudent = {Id: '', Name: '', Address: '', City: '', State: '', Zip: '' };
        
        if(this.state.student){
            localStudent = this.state.student;
        }

        return (
            <div>
                <div className="Row">
                    <div className="col-lg-4">
                        <h1>Manage Assessment</h1>
                        <StudentForm student = {localStudent} showId = {this.state.showId} onChange = {this.setStudentState} onSave = {this.saveStudent} />
                    </div>
                    <div className="col-xs-1" style={{alignItems: "center", width: '2px'}}>
                            <div style={{border: '2px solid green', height: '550px', width: '2px' }}> </div>
                    </div>
                    <div className="col-lg-7">
                        
                        <div className="Row">
                            <div className="col-xs-10">
                            <h1><strong>List of Assessments </strong></h1>

                            </div>
                        </div>
                        <div className="Row">
                            <AssessmentList assessments = {this.state.assessments} checkBoxFlag = {this.state.checkBoxFlag} studentAssessments = {localAssessmentList} onChange = {this.setAssessmentState} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ManageStudentPage;
