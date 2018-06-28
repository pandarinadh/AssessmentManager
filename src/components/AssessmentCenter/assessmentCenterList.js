"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var AssessmentApi = require("../../api/assessmentApi");
var Toastr = require("toastr");
var AssessmentAction = require("../../actions/assessmentActions");

var AssessmentCenterListPage = React.createClass({
   
    render: function(){

        var createAssessmentCenterRow = function(student){
            return (
                <tbody>
                     <tr key={student.Id}>
                                <td>{student.Id}</td>
                                <td>{student.Name}</td>
                                <td>{student.Assessments.map(function (assessment, index) {
                                    return (
                                        <li key={index}><Link to="studentAssessmentPage" params={{assessmentId: assessment.Id, studentId: student.Id}} >{assessment.Text}</Link></li>
                                    );
                                }
                                )}</td>
                    </tr>
                </tbody>
                );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                        <th>Id</th>
                        <th>Student</th>
                        <th>Assessment</th>
                    </thead>
                        {this.props.students.map(createAssessmentCenterRow, this)}
                </table>
            </div>
        );
    }
});

module.exports = AssessmentCenterListPage;