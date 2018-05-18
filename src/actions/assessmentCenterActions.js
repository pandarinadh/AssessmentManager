"use strict";

var Dispatcher = require("../dispatcher/appDispatcher");
var AssessmentCenterApi = require("../api/assessmentCenterApi");
var ActionTypes = require("../constants/actionTypes");

var AssessmentCenterActions = {
    saveStudetnAssessment: function(studentAssessment){
     var newS = AssessmentCenterApi.save(studentAssessment);

     Dispatcher.dispatch({
        actionType: ActionTypes.CREATE_STUDENT_ASSESSMENT,
        studetnAssessment: newS
     });
   }
};

module.exports = AssessmentCenterActions;