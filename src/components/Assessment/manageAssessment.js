"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var Toastr = require("toastr");
var AssessmentStore = require("../../store/assessmentStore");
var AssessmentActions = require("../../actions/assessmentActions");
var QuestionList = require("./../question/questionList");
var AssessmentForm = require("./AssessmentForm");
var QuestionStore = require("../../store/questionStore");
var _ = require("lodash");

var ManageAssessmentPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function(){
        console.log('getInitialState');
        var localAssessment = {Id: '', Text: '', Description: '', Questions: []};
        var localAllQuestions = QuestionStore.getAllQuestions();
        var assessmentId = this.props.params.id;
        if(assessmentId){
            localAssessment = AssessmentStore.getAssessmentById(assessmentId);
        }
        return {
            assessment: localAssessment,
            showId: false,
            AllQuestions: localAllQuestions,
            checkBoxFlag: true
        };
    },

    componentWillMount: function(){
        var assessmentId = this.props.params.id;
        var currentComponent = this;

        if(assessmentId){
            this.setState({ assessment: AssessmentStore.getAssessmentById(assessmentId), showId: true });
        }

        AssessmentStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){

        AssessmentStore.addChangeListener(this._onChange);
    },

    _onChange: function(){
        //debugger;
        console.log('onchange in ManageAssessmentPage');
        var assessmentId = this.props.params.id;
        if(assessmentId){
            this.setState({assessment: AssessmentStore.getAssessmentById(assessmentId), showId: true });
        }

        var localAllQuestions = QuestionStore.getAllQuestions();
        this.setState({AllQuestions: localAllQuestions});
    },

    setQuestionState: function (event) {
      //  debugger;
        var field = event.target.name;
        if(event.target.checked){
            var localQuestion = _.find(this.state.AllQuestions, {Id: parseInt(field)});
            var assessmentQuestion = _.find(this.state.assessment.Questions, {Id: parseInt(field)});
            if(assessmentQuestion){
                var existingAssessmentQuestionIndex = _.indexOf(this.state.assessment.Questions, assessmentQuestion);
                this.state.assessment.Questions.splice(existingAssessmentQuestionIndex, localQuestion);
            } else {
                this.state.assessment.Questions.push(localQuestion);
            }
        }
        else
        {
            _.remove(this.state.assessment.Questions, function(question){
                return parseInt(field) === parseInt(question.Id);
            });
        }

        return this.setState({assessment: this.state.assessment});
    },


    setAssessmentState: function (event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.assessment[field] = value;
        //this.state.assessment.Id = "-1";
        return this.setState({assessment: this.state.assessment});
    },

    saveAssessment: function(event){
        event.preventDefault();
        console.log(this.state.assessment);
         AssessmentActions.saveAssessment(this.state.assessment);
         Toastr.success("assessment saved");
        //this.transitionTo("assessments");
    },

    render: function(){

      
        var questionList = this.state.assessment ? this.state.assessment.Questions : [];
        
        var localAssessment = {Id: '', Text: '', Description: '', Questions: []};
        
        if(this.state.assessment){
            localAssessment = this.state.assessment;
        }

        return (
            <div>
                <div className="Row">
                    <div className="col-lg-4">
                        <h1>Manage Assessment</h1>
                        <AssessmentForm assessment = {localAssessment} onSave = {this.saveAssessment} onChange={this.setAssessmentState} showId = {this.state.showId}/>
                    </div>
                    <div className="col-xs-1" style={{alignItems: "center", width: '2px'}}>
                            <div style={{border: '2px solid green', height: '350px', width: '2px' }}> </div>
                    </div>
                    <div className="col-lg-7">
                        
                        <div className="Row">
                            <div className="col-xs-10">
                            <h1><strong>List of Questions </strong></h1>

                            </div>
                        </div>
                        <div className="Row">
                            <QuestionList questions = {this.state.AllQuestions} assessmentQuestions = {questionList} checkBoxFlag = {this.state.checkBoxFlag} onChange = {this.setQuestionState} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ManageAssessmentPage;
