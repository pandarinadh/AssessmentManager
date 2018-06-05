"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var Toastr = require("toastr");
var QuestionStore = require("../../store/questionStore");
var QuestionActions = require("../../actions/questionActions");
var QuestionForm = require("./questionForm");

var ManageQuestionPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function(){
        console.log('getInitialState ManageQuestionPage');
        var localQuestion = {Id: '', Text: '', Description: '' };
        var questionId = this.props.params.id;

        if(questionId){
            localQuestion = QuestionStore.getQuestionById(questionId);
        }

        return {
            question: localQuestion,
            showId: false
        };
    },

    componentWillMount: function(){
        var questionId = this.props.params.id;
        
        var currentComponent = this;

        if(questionId){
            this.setState({ question: QuestionStore.getQuestionById(questionId), showId: true });
        }

        QuestionStore.addChangeListener(this._onChange);
    },

  componentWillUnmount: function(){
    var questionId = this.props.params.id;
    
    var currentComponent = this;

    if(questionId){
        this.setState({ question: QuestionStore.getQuestionById(questionId), showId: true });
    }

    QuestionStore.removeChangeListener(this._onChange);
    },

    _onChange: function(){
    //debugger;
        console.log('onchange in ManageQuestionPage');
        var questionId = this.props.params.id;
        if(questionId){
            this.setState({question: QuestionStore.getQuestionById(questionId) });
        }
    },
    setQuestionState: function (event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.question[field] = value;
        //this.state.question.Id = "-1";
        return this.setState({question: this.state.question});
    },

    saveQuestion: function(event){
        event.preventDefault();
        console.log(this.state.question);
         QuestionActions.saveQuestion(this.state.question);
         Toastr.success("question saved");
        this.transitionTo("questions");
    },

    render: function(){
        var localQuestion = {Id: '', Text: '', Description: '' };
        //debugger;
        if(this.state.question){
            localQuestion = this.state.question;
        }

        return (
            <div>
                <h1>Manage Question</h1>
                <QuestionForm question = {localQuestion} onChange = {this.setQuestionState} onSave = {this.saveQuestion} showId = {this.state.showId} />
            </div>
        );
    }
});

module.exports = ManageQuestionPage;
