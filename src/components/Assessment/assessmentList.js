"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var AssessmentApi = require("../../api/assessmentApi");
var Toastr = require("toastr");
var AssessmentAction = require("../../actions/assessmentActions");

var AssessmentListPage = React.createClass({
    deleteAssessment: function(id, event){
        // debugger;
        console.log("id" + id);
         event.preventDefault();
         AssessmentAction.deleteAssessment(id);

         Toastr.success("assessment Deleted");
     },


    render: function(){

        var createAssessmentRow = function(assessment){
            return (
                <tr key={assessment.Id}>
                     <td> <a href="#" onClick = {this.deleteAssessment.bind(this, assessment.Id)}> Delete </a> </td>
                    <td><Link to="manageAssessment" params={{id: assessment.Id}}> {assessment.Id} </Link></td>
                    <td>{assessment.Text}</td>
                    <td>{assessment.Description}</td>
                </tr>
            );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                        <th>Delete</th>
                        <th>Id</th>
                        <th>Assessment</th>
                        <th>Description</th>
                    </thead>
                    <tbody>
                        {this.props.assessments.map(createAssessmentRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = AssessmentListPage;