"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var Toastr = require("toastr");
var QuestionAction = require("../../actions/questionActions");
var _ = require("lodash");

var QuestionListPage = React.createClass({
    deleteQuestion: function(id, event){
        // debugger;
        event.preventDefault();
        if(confirm("Are you sure?")){
        console.log("id" + id);
        
         QuestionAction.deleteQuestion(id);

         Toastr.success("question Deleted");
        }
     },


    render: function(){
        var showDelete = this.props.displayCheckBox ? 'none' : 'block';
        var showCheck = this.props.displayCheckBox ? 'block' : 'none';
        console.log(this.props.assessmentQuestions);
        var createQuestionRow = function(question){

            var assessmentQuestion = _.find(this.props.assessmentQuestions, {Id: parseInt(question.Id)});

            var localCheck = assessmentQuestion ? true : false;

            return (
                <tr key={question.Id}>
                     <td> 
                        <div style = {{display: showDelete}}>
                                 <a href="#" onClick = {this.deleteQuestion.bind(this, question.Id)}> Delete </a> 
                        </div>
                        <div style = {{display: showCheck}}>
                                <input type="checkBox" defaultChecked = {localCheck} name = {question.Id} onChange={this.props.onChange}/>
                        </div>
                     </td>
                    <td><Link to="manageQuestion" params={{id: question.Id}}> {question.Id} </Link></td>
                    <td>{question.Text}</td>
                    <td>{question.Description}</td>
                </tr>
            );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                        <th>
                            <div style = {{display: showDelete}}>
                                Delete
                            </div>
                            <div style = {{display: showCheck}}>
                                   Select
                            </div>
                        </th>
                        <th>Id</th>
                        <th>Question</th>
                        <th>Description</th>
                    </thead>
                    <tbody>
                        {this.props.questions.map(createQuestionRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = QuestionListPage;