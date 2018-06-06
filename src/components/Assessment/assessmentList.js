"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var AssessmentApi = require("../../api/assessmentApi");
var Toastr = require("toastr");
var AssessmentAction = require("../../actions/assessmentActions");
var _ = require("lodash");

var AssessmentListPage = React.createClass({
    deleteAssessment: function(id, event){
        // debugger;
        event.preventDefault();
        if(confirm("Are you sure?")){
         AssessmentAction.deleteAssessment(id);

         Toastr.success("assessment Deleted");
        }
     },


    render: function(){

        var showDelete = this.props.displayCheckBox ? 'none' : 'block';
        var showCheck = this.props.displayCheckBox ? 'block' : 'none';

        var createAssessmentRow = function(assessment){

            var studentAssessment = _.find(this.props.studentAssessments, {Id: parseInt(assessment.Id)});

            var localCheck = studentAssessment ? true : false;

            return (
                <tr key={assessment.Id}>
                     <td> 
                        <div style = {{display: showDelete}}>
                                 <a href="#" onClick = {this.deleteAssessment.bind(this, assessment.Id)}> Delete </a> 
                        </div>
                        <div style = {{display: showCheck}}>
                                <input type="checkBox" defaultChecked = {localCheck} name = {assessment.Id} onChange={this.props.onChange}/>
                        </div>
                     </td>

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