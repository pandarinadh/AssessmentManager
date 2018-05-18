"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var Toastr = require("toastr");
var QuestionStore = require("../../store/questionStore");
var QuestionActions = require("../../actions/questionActions");

var ManageQuestionPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function(){
        console.log('getInitialState');
        return {
            question: {Id: '', Text: '', Description: '' },
            showId: false
        };
    },

    componentWillMount: function(){
        var questionId = this.props.params.id;
        var currentComponent = this;

        if(questionId){
            this.setState({ question: QuestionStore.getQuestionById(questionId), showId: true });
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

        var myStyle = this.state.showId ? 'inline' : 'none';

        return (
            <div>
                <h1>Manage Question</h1>
                <div style= {{display: myStyle}}>
                    <div className="form-group">
                        <div>
                            <label htmlFor="question">Id </label>
                            <div className="field">
                                <input type="text" name="Text" readOnly value={this.state.question.Id} className="form-control" onChange={this.setQuestionState} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="question">Question </label>
                        <div className="field">
                            <input type="text" name="Text" value={this.state.question.Text} className="form-control" onChange={this.setQuestionState} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="description">Description</label>
                        <div className="field">
                            <input type="text" name="Description" value={this.state.question.Description} className="form-control" onChange={this.setQuestionState} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Save Question" className="btn btn-default" onClick={this.saveQuestion} />
                    <Link to="questions" className="btn btn-default">Cancel</Link>
                </div>

            </div>
        );
    }
});

module.exports = ManageQuestionPage;
