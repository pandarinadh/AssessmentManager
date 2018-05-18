"use strict";

var Dispatcher = require("../dispatcher/appDispatcher");
var ActionTypes = require("../constants/actionTypes");
var QuestionApi = require("../api/questionApi");
var StudentApi = require("../api/studentApi");
var AssessmentApi = require("../api/assessmentApi");
var AssessmentCenterApi = require("../api/assessmentCenterApi");

var InitializeActions = {
    initApp: function() {
       
        Dispatcher.dispatch({
            actionType: ActionTypes.INITIALIZE,

            initialData: {
                questions: QuestionApi.getAllQuestions(),
                students: StudentApi.getAllStudents(),
                assessments: AssessmentApi.getAllAssessments(),
                studentAssessments: AssessmentCenterApi.getAllStudentAssessments()
            }
        });
    }
};

module.exports = InitializeActions;