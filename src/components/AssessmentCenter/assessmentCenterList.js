"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var AssessmentApi = require("../../api/assessmentApi");
var Toastr = require("toastr");
var AssessmentAction = require("../../actions/assessmentActions");

var AssessmentCenterListPage = React.createClass({
   
    render: function(){

        var createAssessmentCenterRow = function(studentAssessment){
            return (
                <tbody>
                     <tr key={studentAssessment.Student.Id}>
                                <td>{studentAssessment.Student.Id}</td>
                                <td>{studentAssessment.Student.Name}</td>
                                <td>{studentAssessment.Student.Assessments.map(function (assessment) {
                                    return (
                                        
                                        <li><Link to="studentAssessmentPage" params={{assessmentId: assessment.Id, studentId: studentAssessment.Student.Id}} >{assessment.Text}</Link></li>
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
                        {this.props.studentAssessments.map(createAssessmentCenterRow, this)}
                </table>
            </div>
        );
    }
});

module.exports = AssessmentCenterListPage;