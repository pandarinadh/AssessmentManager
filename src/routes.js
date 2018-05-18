"use strict";

var React = require("react");

var Router = require("react-router");
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var routes = (
    <Route name ="app" path="/" handler={require("./components/app")}>
        <DefaultRoute handler={require("./components/homePage")} />
        <Route name="questions" handler={require("./components/question/questionPage")} />
        <Route name="addQuestion" path="question" handler={require("./components/question/manageQuestion")} />
        <Route name="manageQuestion" path="question/:id" handler={require("./components/question/manageQuestion")} />
        <Route name="students" handler={require("./components/Student/studentPage")} />
        <Route name="addStudent" path="student" handler={require("./components/Student/manageStudent")} />
        <Route name="manageStudent" path="student/:id" handler={require("./components/student/manageStudent")} />
        <Route name="assessments" handler={require("./components/Assessment/assessmentPage")} />
        <Route name="addAssessment" path="assessment" handler={require("./components/Assessment/manageAssessment")} />
        <Route name="manageAssessment" path="assessment/:id" handler={require("./components/assessment/manageAssessment")} />
        <Route name="studentAssessments" handler={require("./components/AssessmentCenter/assessmentCenterPage")} />
        <Route name="studentAssessmentPage"path="studentAssessment/:studentId/:assessmentId" handler={require("./components/AssessmentCenter/studentAssessmentPage")} />
    </Route>
);

module.exports = routes;