"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var Toastr = require("toastr");
var QuestionAction = require("../../actions/questionActions");

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

        var createQuestionRow = function(question){
            return (
                <tr key={question.Id}>
                     <td> <a href="#" onClick = {this.deleteQuestion.bind(this, question.Id)}> Delete </a> </td>
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
                        <th>Delete</th>
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