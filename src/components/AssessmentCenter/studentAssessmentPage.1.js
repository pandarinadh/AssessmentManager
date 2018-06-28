"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var AssessmentCenterList = require("./assessmentCenterList");
var AssessmentCenterStore = require("../../store/assessmentCenterStore");
var AssessmentCenterActions = require("./../../actions/assessmentCenterActions");
var AssessmentStore = require("../../store/assessmentStore");
var StudentStore = require("../../store/studentStore");

var _ = require("lodash");

var StudentAssessmentPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function() {
        console.log('getInitialState in AssessmentCenterPage');
        var studentId = this.props.params.studentId;
        var assessmentId = this.props.params.assessmentId;
        var localAssessment = AssessmentStore.getAssessmentById(assessmentId);
        var localstudentAssessment = StudentStore.getStudentById(studentId);
        var randomValue = localAssessment ? this.randomValue(localAssessment.Questions.length) : 0;
        return {
            generatedRandomValues: [randomValue],
            studentAssessment: localstudentAssessment ? localstudentAssessment : {},
            assessment: localAssessment ? localAssessment : {},
            errors: {},
            dirty: true,
            questionId: randomValue,
            question: localAssessment ? localAssessment.Questions[randomValue] : {},
            anweredQuestions: [],
            done: "none",
            defaultChecked: "",
            date: new Date(),
            counter: 10
        };
    },
    
    randomValue: function(len){
        var local = Math.floor(Math.random() * len);
       return local;
    },
   
    randomValue1: function(len){
        var local = Math.floor(Math.random() * len);
       if(this.state.generatedRandomValues.length === this.state.assessment.Questions.length){
            this.setState({done: 'block'});
            return -1;
        }
        else if(this.state.generatedRandomValues.indexOf(local) === -1){
            this.state.generatedRandomValues.push(local);
             return local;
        } 
        else {
            return this.randomValue1(len);
        }
    },

    statics: {
        willTransitionFrom: function(transition, component){
            if(component.state.dirty && !confirm("Are you sure, you want to leave?")){
                transition.abort();
            }
        }
    },

    componentDidMount: function() {
        //debugger;
        this.timerID = setInterval(this.tick, 1000);
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
      clearInterval(this.timerID);
    },
    
    _onChange: function(){
        //debugger;
        console.log('onchange in AssessmentCenterPage');
       
        var studentId = this.props.params.studentId;
        var assessmentId = this.props.params.assessmentId;
        var localAssessment = AssessmentStore.getAssessmentById(assessmentId);
       var localstudentAssessment = AssessmentCenterStore.getStudentAssessmentsById(studentId);
        this.setState({
            studentAssessment: localstudentAssessment ? localstudentAssessment : {},
            assessment: localAssessment ? localAssessment : {},
            questionId: this.state.questionId,
            question: localAssessment ? localAssessment.Questions[this.state.questionId] : {}
        });
    },

    tick: function() {
        if(this.state.done !== 'block'){
            if(this.state.counter < 2){
                this.processAnswer();
            }
        
            this.setState({
            date: new Date(),
            counter: --this.state.counter
            });
        }
        else {
            clearInterval(this.timerID);
        }
      },

      processAnswer: function(){
        var assessmentId = this.props.params.assessmentId;
        
        //debugger;
        if(this.state.done !== 'block'){
            if(this.state.anweredQuestions.indexOf(this.state.question) === -1){
                this.state.anweredQuestions.push(this.state.question);
                var localStudentAssessment = _.find(this.state.studentAssessment.Student.Assessments, {Id: parseInt(assessmentId)});
                var existingAssessmentIndex = _.indexOf(this.state.studentAssessment.Student.Assessments, localStudentAssessment);
                
                var localQuestion = _.find(this.state.studentAssessment.Student.Assessments[existingAssessmentIndex].Questions, {Id: parseInt(this.state.question.Id)});

                var existingQuestionIndex = _.indexOf(this.state.studentAssessment.Student.Assessments[existingAssessmentIndex].Questions, localQuestion);
                this.state.studentAssessment.Student.Assessments[existingAssessmentIndex].Questions[existingQuestionIndex] = this.state.question;
            }
       
            var randomValue = this.randomValue1(this.state.assessment.Questions.length);

            if(randomValue === -1) { 
            
                AssessmentCenterActions.saveStudetnAssessment(this.state.studentAssessment);
                this.setState({dirty: false});
                return; 
            }

            this.setState({
                anweredQuestions: this.state.anweredQuestions,
                questionId: randomValue,
                question: this.state.assessment.Questions[randomValue],
                answerValue: false,
                defaultChecked: "",
                counter: 10,
                dirty: true
            });
        }
      },

    sumbitAnswer: function(event){
        this.processAnswer();
    }, 

    setAnswer: function(obj, event) {
        var answer = 2;
        
        if(event.target.value === 'Yes'){
            answer = 1;
            this.state.defaultChecked = "Yes";
        } else if(event.target.value === 'No'){
            answer = 0;
            this.state.defaultChecked = "No";
        }

        this.state.question.Score = {
            Id: 0,
            Answer: answer
        };
        this.state.answerValue = true;
        this.setState({question: this.state.question, defaultChecked: this.state.defaultChecked });
    },
  
      
    getQuestion: function(event){
      //  event.preventDefault();
        
        var value = event.target.value;
      
        var id = this.state.questionId;

        if(value === '<<<'){
            id = --this.state.questionId;
            if (id < 0){
                id = 0;
            }
        } else {
                id = ++this.state.questionId;
            if (id > this.state.assessment.Questions.length - 1){
                id = this.state.assessment.Questions.length - 1;
            }
        }
      
        this.setState({
            questionId: id,
            question: this.state.assessment.Questions[id]});
    },

    render: function(){
        var displayValue = this.state.anweredQuestions.length > 0 ? 'block' : 'none';

        var displayDoneValue = this.state.done === 'none' ? 'block' : 'none';
        var studentName = this.state.studentAssessment.Student ? this.state.studentAssessment.Student.Name : '';
        var totalQuestionLength = this.state.assessment.Questions ? this.state.assessment.Questions.length : 0;
        var answeredQuestionLength = this.state.anweredQuestions ? this.state.anweredQuestions.length + 1 : 0;

        var createAnsweredQuetionRow = function(answeredQuetion){
            var answer = answeredQuetion.Score && answeredQuetion.Score.Answer === 1 ? 'Answered' : 'Not Answered'; 
            var answerColor = answeredQuetion.Score && answeredQuetion.Score.Answer === 1 ? 'green' : 'red';
            return (
                <div key={answeredQuetion.Id}>
                    <div className="row" style={{color: 'black', paddingBottom: '10', paddingTop: '10'}}>
                        <div className="col-lg-12">
                            {answeredQuetion.Id}. {answeredQuetion.Text}
                        </div>
                    </div>
                    <div className="row" style={{color: 'black'}}>
                        <div className="col-lg-3">
                            <li>{answer}</li>
                        </div>
                        <div className="col-lg-9">
                            <div className="well well-sm" style={{background: answerColor}}>&nbsp;</div>
                        </div>
                    </div>
                </div>    
            );
        };
       
        return (
            <div className="container-fluid" style={{color: 'black'}}>
               <div>
                    <div className="row" style={{paddingBottom: '50'}}>
                            <div className="col-lg-2">
                            <strong>StudentName: </strong> {studentName}
                            </div>
                            <div className="col-lg-4">
                            <strong>Subject: </strong> {this.state.assessment.Text}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-1" style={{textAlign: 'left', display: displayDoneValue}}>
                                {answeredQuestionLength} of {totalQuestionLength}
                            </div>
                            <div className="col-lg-4" style={{textAlign: 'right', display: displayDoneValue}}>
                                Time: {this.state.counter}
                            </div>
                        </div>
                            <div className="row">
                                <div className="col-lg-5" style={{color: 'black', border: '2px solid silver', textAlign: 'center', height: '350', paddingTop: '100'}}>
                                    <div style={{display: displayDoneValue}}>
                                        <div className="row" style= {{height: '70'}}>
                                            <div style={{paddingBottom: '10' }}>
                                                {this.state.question.Id}. {this.state.question.Text}
                                            </div>
                                        </div>
                                        <div className="row" style={{paddingTop: '10'}}>
                                                
                                        </div>
                                            <div className="row">
                                                    <div className="col-lg-1">
                                                        &nbsp;
                                                    </div>
                                                    <div className="col-lg-6" style={{textAlign: 'right' }} onChange={this.setAnswer.bind(this, this)} >
                                                        <input type="radio" value="Yes" name="Answer" checked={this.state.defaultChecked === "Yes"}>Yes</input> &nbsp;&nbsp;
                                                        <input type="radio" value="No" name="Answer" checked={this.state.defaultChecked === "No"}>No</input>
                                                    </div>
                                            </div>
                                            <div className="row" style={{paddingTop: '20'}}>
                                                    <div className="col-lg-1">
                                                        &nbsp;
                                                    </div>
                                                    <div className="col-lg-10" style={{textAlign: 'center'}}>
                                                        <button type="button" className="btn btn-primary btn-sm btn-block" onClick={this.sumbitAnswer.bind(this, this)}>Answer</button>
                                                    </div>
                                            </div>
                                            <div className="row" style={{paddingTop: '20', border: '2px solid silver', display: 'none'}}>
                                                    <div className="col-lg-2" style={{textAlign: 'right', border: '2px solid silver' }}>
                                                        <input type="button" value="<<<" onClick={this.getQuestion.bind(this, this)}/>
                                                    </div>
                                                    <div className="col-lg-5" style={{textAlign: 'right' }}>
                                                        <button type="button" className="btn btn-primary btn-sm btn-block" onClick={this.sumbitAnswer.bind(this, this)}>Answer</button>
                                                    </div>
                                                    <div className="col-lg-1" style={{textAlign: 'left' }}>
                                                        <input type="submit" value=">>>" onClick={this.getQuestion.bind(this, this)}/>
                                                    </div>
                                            </div>
                                        </div>
                                        <div style={{display: this.state.done}}>
                                            <div className="row">
                                                <h1 style={{color: 'red'}}>Done!</h1>
                                            </div>
                                        </div>
                                     </div>
                                       
                                <div className="col-lg-1">
                                    &nbsp;
                                </div>
                                <div className="col-lg-5" style={{border: '2px solid silver', paddingTop: '5', paddingBottom: '5', display: displayValue}}>
                                    {this.state.anweredQuestions.sort().map(createAnsweredQuetionRow, this)}
                                </div>
                            
                            </div>
                        </div>
            </div>
        );
    }
});

module.exports = StudentAssessmentPage;