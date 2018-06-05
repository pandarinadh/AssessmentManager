"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var Toastr = require("toastr");
var AssessmentStore = require("../../store/assessmentStore");
var AssessmentActions = require("../../actions/assessmentActions");
var QuestionList = require("./../question/questionList");
var AssessmentForm = require("./AssessmentForm");

var ManageAssessmentPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function(){
        console.log('getInitialState');
        var localAssessment = {Id: '', Text: '', Description: '', Questions: []};
        var assessmentId = this.props.params.id;
        if(assessmentId){
            localAssessment = AssessmentStore.getAssessmentById(assessmentId);
        }
        return {
            assessment: localAssessment,
            showId: false
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
        this.transitionTo("assessments");
    },

    render: function(){

      
        var questionList = this.state.assessment ? this.state.assessment.Questions : [];
        
        var localAssessment = {Id: '', Text: '', Description: '', Questions: []};
        
        if(this.state.assessment){
            localAssessment = this.state.assessment;
        }

        return (
            <div>
                <h1>Manage Assessment</h1>
                <AssessmentForm assessment = {localAssessment} onSave = {this.state.saveAssessment} onChange={this.setAssessmentState} showId = {this.state.showId}/>

                <div className="Row">
                    <div className="col-xs-10">
                       <h1><strong>List of Questions </strong></h1>
                    </div>
                </div>
                <div className="Row">
                    <QuestionList questions = {questionList} />
                 </div>
            </div>
        );
    }
});

module.exports = ManageAssessmentPage;
